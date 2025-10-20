from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, Template

api = Api()

class TemplateResource(Resource):
	pass


api.add_resource(TemplateResource, '/template')