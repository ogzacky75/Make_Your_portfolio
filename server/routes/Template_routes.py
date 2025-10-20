from flask_restful import Resource, Api
from models import Template
api = Api()

class TemplateResource(Resource):
	pass


api.add_resource(TemplateResource, '/template')