from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, Favorite

api = Api()

class FavoritesResource(Resource):
	pass


api.add_resource(FavoritesResource, '/favorites')