from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, Education

api = Api()

class EducationResource(Resource):
	pass


api.add_resource(EducationResource, '/education')