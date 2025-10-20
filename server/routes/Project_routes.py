from flask_restful import Resource, Api
from models import Project

api = Api()

class ProjectResource(Resource):
	pass


api.add_resource(ProjectResource, '/project')