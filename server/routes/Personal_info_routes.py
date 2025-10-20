from flask_restful import Resource, Api
from models import PersonalInfo

api = Api()

class PersonalInfoResource(Resource):
	pass


api.add_resource(PersonalInfoResource, '/personal_info')