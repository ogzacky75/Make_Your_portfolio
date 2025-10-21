from flask import request
from flask_restful import Resource, Api
from models import db, Portfolio

api = Api()

def serialize_portfolio(portfolio):
    return {
        "id": portfolio.id,
        "user_id": portfolio.user_id,
        "template_id": portfolio.template_id,
        "title": portfolio.title,
        "created_at": portfolio.created_at.isoformat() if portfolio.created_at else None,
        "updated_at": portfolio.updated_at.isoformat() if portfolio.updated_at else None,
        "skills": [{"id": s.id, "skill_name": s.skill_name} for s in getattr(portfolio, "skills", [])],
        "education": [{"id": e.id, "institution": e.institution, "degree": e.degree} for e in getattr(portfolio, "education", [])],
        "experience": [{"id": ex.id, "company": ex.company, "job_title": ex.job_title} for ex in getattr(portfolio, "experience", [])],
        "projects": [{"id": pr.id, "project_name": pr.project_name, "description": pr.description} for pr in getattr(portfolio, "projects", [])],
        "personal_info": {
            "id": portfolio.personal_info.id,
            "name": portfolio.personal_info.name,
            "photo_url": portfolio.personal_info.photo_url,
            "contact_email": portfolio.personal_info.contact_email,
            "phone": portfolio.personal_info.phone,
            "linkedin": portfolio.personal_info.linkedin,
            "github": portfolio.personal_info.github,
            "website": portfolio.personal_info.website
        } if portfolio.personal_info else None
    }

class PortfolioListResource(Resource):
    def get(self):
        portfolios = Portfolio.query.all()
        return [serialize_portfolio(p) for p in portfolios], 200

    def post(self):
        data = request.get_json() or {}
        new_portfolio = Portfolio(
            user_id=data.get('user_id'),
            template_id=data.get('template_id'),
            title=data.get('title')
        )
        db.session.add(new_portfolio)
        db.session.commit()
        return serialize_portfolio(new_portfolio), 201

class PortfolioResource(Resource):
    def get(self, portfolio_id):
        portfolio = Portfolio.query.get(portfolio_id)
        if not portfolio:
            return {'error': 'Portfolio not found'}, 404
        return serialize_portfolio(portfolio), 200

    def delete(self, portfolio_id):
        portfolio = Portfolio.query.get(portfolio_id)
        if not portfolio:
            return {'error': 'Portfolio not found'}, 404
        db.session.delete(portfolio)
        db.session.commit()
        return {'message': 'Portfolio deleted'}, 200

api.add_resource(PortfolioListResource, '/portfolios')
api.add_resource(PortfolioResource, '/portfolios/<int:portfolio_id>')
