from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, PersonalInfo

api = Api()

class PersonalInfoResource(Resource):
	pass


api.add_resource(PersonalInfoResource, '/personal_info')