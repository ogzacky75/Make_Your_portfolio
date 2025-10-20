from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, Skill

api = Api()

class SkillResource(Resource):
	def post(self):
			data = request.get_json()
			
			if not data or 'skill_name' not in data or 'portfolio_id' not in data:
				return {'error': 'skill_name and portfolio_id are required'}, 400

			new_skill = Skill(
				skill_name=data['skill_name'],
				portfolio_id=data['portfolio_id']
			)
			db.session.add(new_skill)
			db.session.commit()

			return new_skill.to_dict(), 201


api.add_resource(SkillResource, '/skill')