from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, Experience

api = Api()

class ExperienceListResource(Resource):
	def get(self):
		experience = Experience.query.all()
		return [e.to_dict() for e in experience], 200
	
	def post(self):
		data = request.get_json()
		new_experience = Experience(
			portfolio_id=data.get('portfolio_id'),
			job_title=data.get('job_title'),
			company=data.get('company'),
			start_date=data.get('start_date'),
			end_date=data.get('end_date'),
			description=data.get('description')
		)

		db.session.add(new_experience)
		db.session.commit()
		return new_experience.to_dict(), 201
	
class ExperienceResource(Resource):
	def delete(self, experience_id):
		experience = Experience.query.get(experience_id)
		if not experience:
			return {'error': 'Experience not found'}, 404
		db.session.delete(experience)
		db.session.commit()
		return {'message': 'Experience deleted'}, 200
		


api.add_resource(ExperienceListResource, '/experience')
api.add_resource(ExperienceResource, '/experience/<int:experience_id>')