from flask import request
from flask_restful import Resource, Api
from models import db, Education

api = Api()

def serialize_education(edu):
    return {
        "id": edu.id,
        "portfolio_id": edu.portfolio_id,
        "institution": edu.institution,
        "degree": edu.degree,
        "start_year": edu.start_year,
        "end_year": edu.end_year
    }

class EducationListResource(Resource):
    def get(self):
        educations = Education.query.all()
        return [serialize_education(e) for e in educations], 200

    def post(self):
        data = request.get_json() or {}
        required_fields = ['portfolio_id', 'institution', 'degree', 'start_year']
        if not all(field in data for field in required_fields):
            return {'error': f"{', '.join(required_fields)} are required"}, 400

        new_edu = Education(
            portfolio_id=data['portfolio_id'],
            institution=data['institution'],
            degree=data['degree'],
            start_year=data['start_year'],
            end_year=data.get('end_year')
        )

        db.session.add(new_edu)
        db.session.commit()
        return serialize_education(new_edu), 201


class EducationResource(Resource):
    def get(self, education_id):
        edu = Education.query.get(education_id)
        if not edu:
            return {'error': 'Education not found'}, 404
        return serialize_education(edu), 200

    def patch(self, education_id):
        edu = Education.query.get(education_id)
        if not edu:
            return {'error': 'Education not found'}, 404

        data = request.get_json() or {}
        for field in ['institution', 'degree', 'start_year', 'end_year']:
            if field in data:
                setattr(edu, field, data[field])

        db.session.commit()
        return serialize_education(edu), 200

    def delete(self, education_id):
        edu = Education.query.get(education_id)
        if not edu:
            return {'error': 'Education not found'}, 404

        db.session.delete(edu)
        db.session.commit()
        return {'message': 'Education deleted'}, 200


api.add_resource(EducationListResource, '/education')
api.add_resource(EducationResource, '/education/<int:education_id>')
