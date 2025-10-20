from flask_restful import Resource, Api
from models import Experience

api = Api()

class ExperienceResource(Resource):
	pass


api.add_resource(ExperienceResource, '/experience')