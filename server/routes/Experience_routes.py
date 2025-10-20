from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, Experience

api = Api()

class ExperienceResource(Resource):
	pass


api.add_resource(ExperienceResource, '/experience')