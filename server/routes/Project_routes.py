from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, Project

api = Api()

class ProjectResource(Resource):
	pass


api.add_resource(ProjectResource, '/project')