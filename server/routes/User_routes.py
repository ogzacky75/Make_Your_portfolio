from flask_restful import Resource, Api
from models import User

api = Api()

class UserResource(Resource):
	pass


api.add_resource(UserResource, '/user')