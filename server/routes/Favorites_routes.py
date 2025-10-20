from flask_restful import Resource, Api
from models import Favorite

api = Api()

class FavoritesResource(Resource):
	pass


api.add_resource(FavoritesResource, '/favorites')