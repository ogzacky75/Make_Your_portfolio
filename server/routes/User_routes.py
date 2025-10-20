from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, User

api = Api()

class UserResource(Resource):
	pass


api.add_resource(UserResource, '/user')