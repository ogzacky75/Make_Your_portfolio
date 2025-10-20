from flask_restful import Resource, Api
from models import Education

api = Api()

class EducationResource(Resource):
	pass


api.add_resource(EducationResource, '/education')