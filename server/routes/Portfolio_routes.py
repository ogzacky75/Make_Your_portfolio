from flask import request
from flask_restful import Resource, Api
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Portfolio, User, Template
from flask import render_template
from os import environ
import os

api = Api()


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
        current_user_id = get_jwt_identity()
        portfolios = Portfolio.query.filter_by(user_id=current_user_id).all()
        return [serialize_portfolio(p) for p in portfolios], 200

    @jwt_required()
    def post(self):
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

        portfolio_id = portfolio.id

        personal = data.get("personal_info")
        if personal:
            from models import PersonalInfo
            pi = PersonalInfo(
                portfolio_id=portfolio_id,
                name=personal.get("name"),
                photo_url=personal.get("photo_url"),
                contact_email=personal.get("contact_email"),
                phone=personal.get("phone"),
                linkedin=personal.get("linkedin"),
                github=personal.get("github"),
                website=personal.get("website")
            )
            db.session.add(pi)

        from models import Education, Experience, Project, Skill

        for edu in data.get("education", []):
            if not isinstance(edu, dict):  
                continue
            e = Education(
                portfolio_id=portfolio_id,
                institution=edu.get("institution"),
                degree=edu.get("degree"),
                start_year=edu.get("start_year"),
                end_year=edu.get("end_year")
            )
            db.session.add(e)

        for exp in data.get("experience", []):
            if not isinstance(exp, dict):
                continue
            ex = Experience(
                portfolio_id=portfolio_id,
                job_title=exp.get("job_title"),
                company=exp.get("company"),
                start_date=exp.get("start_date"),
                end_date=exp.get("end_date"),
                description=exp.get("description")
            )
            db.session.add(ex)

        for proj in data.get("projects", []):
            if not isinstance(proj, dict):
                continue
            p = Project(
                portfolio_id=portfolio_id,
                project_name=proj.get("project_name"),
                description=proj.get("description"),
                image_url=proj.get("image_url"),
                project_link=proj.get("project_link")
            )
            db.session.add(p)

        for skill in data.get("skills", []):
            skill_name = skill if isinstance(skill, str) else skill.get("skill_name")
            if skill_name:  
                s = Skill(
                    portfolio_id=portfolio_id,
                    skill_name=skill_name
                )
                db.session.add(s)

        db.session.commit()

        return {
            "message": "Portfolio created successfully",
            "slug": portfolio.slug,
            "portfolio_url": f"{os.environ.get('FRONTEND_URL', 'https://make-your-portfolio.onrender.com')}/portfolios/{portfolio.slug}"
            "portfolio": serialize_portfolio(portfolio)
        }, 201




class PortfolioDetailResource(Resource):
    def get(self, slug):
        portfolio = Portfolio.query.filter_by(slug=slug).first()
        if not portfolio:
            return {"error": "Portfolio not found"}, 404
        
        template_file = f"templates_portfolio/template{portfolio.template.id}.html"
        
        return render_template(template_file, portfolio=portfolio), 200

    @jwt_required()
    def delete(self, slug):
        current_user_id = get_jwt_identity()
        portfolio = Portfolio.query.filter_by(slug=slug, user_id=current_user_id).first()

        if not portfolio:
            return {"error": "Portfolio not found or unauthorized"}, 404

        db.session.delete(portfolio)
        db.session.commit()

        return {"message": "Portfolio deleted successfully"}, 200

api.add_resource(PortfolioListResource, '/portfolios')
api.add_resource(PortfolioDetailResource, '/portfolios/<string:slug>')
