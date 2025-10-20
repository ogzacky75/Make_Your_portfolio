from flask_restful import Resource, Api
from models import Portfolio

api = Api()

class PortfolioResource(Resource):
	pass


api.add_resource(PortfolioResource, '/portfolio')