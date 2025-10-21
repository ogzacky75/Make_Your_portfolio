from flask import request
from flask_restful import Resource, Api
from models import db, PersonalInfo

api = Api()

def serialize_personal_info(pi):
    return {
        "id": pi.id,
        "portfolio_id": pi.portfolio_id,
        "name": pi.name,
        "photo_url": pi.photo_url,
        "contact_email": pi.contact_email,
        "phone": pi.phone,
        "linkedin": pi.linkedin,
        "github": pi.github,
        "website": pi.website
    }

class PersonalInfoListResource(Resource):
    def get(self):
        personal_infos = PersonalInfo.query.all()
        return [serialize_personal_info(pi) for pi in personal_infos], 200

    def post(self):
        data = request.get_json() or {}
        if 'portfolio_id' not in data or 'name' not in data:
            return {'error': 'portfolio_id and name are required'}, 400

        new_pi = PersonalInfo(
            portfolio_id=data['portfolio_id'],
            name=data['name'],
            photo_url=data.get('photo_url'),
            contact_email=data.get('contact_email'),
            phone=data.get('phone'),
            linkedin=data.get('linkedin'),
            github=data.get('github'),
            website=data.get('website')
        )

        db.session.add(new_pi)
        db.session.commit()
        return serialize_personal_info(new_pi), 201


class PersonalInfoResource(Resource):
    def get(self, info_id):
        pi = PersonalInfo.query.get(info_id)
        if not pi:
            return {'error': 'PersonalInfo not found'}, 404
        return serialize_personal_info(pi), 200

    def patch(self, info_id):
        pi = PersonalInfo.query.get(info_id)
        if not pi:
            return {'error': 'PersonalInfo not found'}, 404

        data = request.get_json() or {}
        for field in ['name', 'photo_url', 'contact_email', 'phone', 'linkedin', 'github', 'website']:
            if field in data:
                setattr(pi, field, data[field])

        db.session.commit()
        return serialize_personal_info(pi), 200

    def delete(self, info_id):
        pi = PersonalInfo.query.get(info_id)
        if not pi:
            return {'error': 'PersonalInfo not found'}, 404

        db.session.delete(pi)
        db.session.commit()
        return {'message': 'PersonalInfo deleted successfully'}, 200


api.add_resource(PersonalInfoListResource, '/personal_info')
api.add_resource(PersonalInfoResource, '/personal_info/<int:info_id>')
