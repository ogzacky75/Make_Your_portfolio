from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from models import db, Education

api = Api()

class EducationListResource(Resource):
	def get(self):
		educations = Education.query.all()
		return [e.to_dict() for e in educations], 200
	def post(self):
		data = request.get_json()
		new_education = Education(
			portfolio_id=data.get('portfolio_id'),
			institution=data.get('institution'),
			degree=data.get('degree'),
			start_year=data.get('start_year'),
			end_year=data.get('end_year')
		)

		db.session.add(new_education)
		db.session.commit()
		return new_education.to_dict(), 201

class EducationResource(Resource):
	def delete(self, education_id):
		education = Education.query.get(education_id)
		if not education:
			return {'error': 'Education not found'}, 404
		db.session.delete(education)
		db.session.commit()
		return {'message': 'Education deleted'}, 200
	


api.add_resource(EducationListResource, '/education')
api.add_resource(EducationResource, '/education/<int:education_id>')