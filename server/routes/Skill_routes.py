from flask_restful import Resource, Api
from models import Skill

api = Api()

class SkillResource(Resource):
	pass


api.add_resource(SkillResource, '/skill')