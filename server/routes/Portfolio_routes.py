from flask import request
from flask_restful import Resource, Api
from models import db, Portfolio

api = Api()

class PortfolioListResource(Resource):
    def get(self):
        portfolios = Portfolio.query.all()
        return [p.to_dict() for p in portfolios], 200

    def post(self):
        data = request.get_json()
        new_p = Portfolio(
            user_id=data.get('user_id'),
            template_id=data.get('template_id'),
            title=data.get('title')
        )
        db.session.add(new_p)
        db.session.commit()
        return new_p.to_dict(), 201

class PortfolioResource(Resource):
    def get(self, portfolio_id):
        p = Portfolio.query.get(portfolio_id)
        if not p:
            return {'error': 'Portfolio not found'}, 404
        return p.to_dict(), 200

    def delete(self, portfolio_id):
        p = Portfolio.query.get(portfolio_id)
        if not p:
            return {'error': 'Portfolio not found'}, 404
        db.session.delete(p)
        db.session.commit()
        return {'message': 'Portfolio deleted'}, 200

api.add_resource(PortfolioListResource, '/portfolios')
api.add_resource(PortfolioResource, '/portfolios/<int:portfolio_id>')
