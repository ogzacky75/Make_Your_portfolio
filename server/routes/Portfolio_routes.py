from flask import request
from flask_restful import Resource, Api
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Portfolio, User, Template

api = Api()


# --- SERIALIZER --- #
def serialize_portfolio(portfolio):
    return {
        "id": portfolio.id,
        "slug": portfolio.slug,
        "title": portfolio.title,
        "user": {
            "id": portfolio.user.id,
            "username": portfolio.user.username,
            "email": portfolio.user.email
        } if portfolio.user else None,
        "template": {
            "id": portfolio.template.id,
            "name": portfolio.template.name,
            "image": portfolio.template.image,
            "preview_url": portfolio.template.preview_url
        } if portfolio.template else None,
        "created_at": portfolio.created_at.isoformat() if portfolio.created_at else None,
        "updated_at": portfolio.updated_at.isoformat() if portfolio.updated_at else None,

        # Related data
        "personal_info": {
            "name": portfolio.personal_info.name,
            "photo_url": portfolio.personal_info.photo_url,
            "contact_email": portfolio.personal_info.contact_email,
            "phone": portfolio.personal_info.phone,
            "linkedin": portfolio.personal_info.linkedin,
            "github": portfolio.personal_info.github,
            "website": portfolio.personal_info.website
        } if portfolio.personal_info else None,

        "education": [
            {
                "institution": e.institution,
                "degree": e.degree,
                "start_year": e.start_year,
                "end_year": e.end_year
            }
            for e in portfolio.education
        ],

        "experience": [
            {
                "job_title": ex.job_title,
                "company": ex.company,
                "start_date": ex.start_date,
                "end_date": ex.end_date,
                "description": ex.description
            }
            for ex in portfolio.experience
        ],

        "projects": [
            {
                "project_name": pr.project_name,
                "description": pr.description,
                "image_url": pr.image_url,
                "project_link": pr.project_link
            }
            for pr in portfolio.projects
        ],

        "skills": [
            {"skill_name": s.skill_name}
            for s in portfolio.skills
        ]
    }


class PortfolioListResource(Resource):
    @jwt_required()
    def get(self):
        """Get all portfolios for the authenticated user."""
        current_user_id = get_jwt_identity()
        portfolios = Portfolio.query.filter_by(user_id=current_user_id).all()
        return [serialize_portfolio(p) for p in portfolios], 200

    @jwt_required()
    def post(self):
        """Create a new portfolio for the authenticated user."""
        current_user_id = get_jwt_identity()
        data = request.get_json()

        user = User.query.get(current_user_id)
        template = Template.query.get(data.get("template_id"))

        if not user or not template:
            return {"error": "User or Template not found"}, 404

        portfolio = Portfolio(
            user_id=user.id,
            template_id=template.id,
            title=data.get("title", f"{user.username}'s Portfolio")
        )
        portfolio.generate_slug(user.username)

        db.session.add(portfolio)
        db.session.commit()

        return {
            "message": "Portfolio created successfully",
            "slug": portfolio.slug,
            "portfolio_url": f"/portfolios/{portfolio.slug}"
        }, 201


class PortfolioDetailResource(Resource):
    def get(self, slug):
        """Public route — view a full portfolio by slug."""
        portfolio = Portfolio.query.filter_by(slug=slug).first()
        if not portfolio:
            return {"error": "Portfolio not found"}, 404

        return serialize_portfolio(portfolio), 200

    @jwt_required()
    def delete(self, slug):
        """Delete a user's portfolio by slug."""
        current_user_id = get_jwt_identity()
        portfolio = Portfolio.query.filter_by(slug=slug, user_id=current_user_id).first()

        if not portfolio:
            return {"error": "Portfolio not found or unauthorized"}, 404

        db.session.delete(portfolio)
        db.session.commit()

        return {"message": "Portfolio deleted successfully"}, 200

api.add_resource(PortfolioListResource, '/portfolios')
api.add_resource(PortfolioDetailResource, '/portfolios/<string:slug>')