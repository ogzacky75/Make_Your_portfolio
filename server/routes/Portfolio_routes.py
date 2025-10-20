from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, Portfolio

api = Api()

class PortfolioResource(Resource):
	pass


api.add_resource(PortfolioResource, '/portfolio')