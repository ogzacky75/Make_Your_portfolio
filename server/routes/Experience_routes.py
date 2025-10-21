from flask import request
from flask_restful import Resource, Api
from models import db, Experience

api = Api()

def serialize_experience(exp):
    return {
        "id": exp.id,
        "portfolio_id": exp.portfolio_id,
        "job_title": exp.job_title,
        "company": exp.company,
        "start_date": exp.start_date,
        "end_date": exp.end_date,
        "description": exp.description
    }

class ExperienceListResource(Resource):
    def get(self):
        experiences = Experience.query.all()
        return [serialize_experience(e) for e in experiences], 200

    def post(self):
        data = request.get_json() or {}
        required_fields = ['portfolio_id', 'job_title', 'company', 'start_date']
        if not all(field in data for field in required_fields):
            return {'error': f"{', '.join(required_fields)} are required"}, 400

        new_exp = Experience(
            portfolio_id=data['portfolio_id'],
            job_title=data['job_title'],
            company=data['company'],
            start_date=data['start_date'],
            end_date=data.get('end_date'),
            description=data.get('description')
        )

        db.session.add(new_exp)
        db.session.commit()
        return serialize_experience(new_exp), 201


class ExperienceResource(Resource):
    def get(self, experience_id):
        exp = Experience.query.get(experience_id)
        if not exp:
            return {'error': 'Experience not found'}, 404
        return serialize_experience(exp), 200

    def patch(self, experience_id):
        exp = Experience.query.get(experience_id)
        if not exp:
            return {'error': 'Experience not found'}, 404

        data = request.get_json() or {}
        for field in ['job_title', 'company', 'start_date', 'end_date', 'description']:
            if field in data:
                setattr(exp, field, data[field])

        db.session.commit()
        return serialize_experience(exp), 200

    def delete(self, experience_id):
        exp = Experience.query.get(experience_id)
        if not exp:
            return {'error': 'Experience not found'}, 404

        db.session.delete(exp)
        db.session.commit()
        return {'message': 'Experience deleted'}, 200


api.add_resource(ExperienceListResource, '/experience')
api.add_resource(ExperienceResource, '/experience/<int:experience_id>')
