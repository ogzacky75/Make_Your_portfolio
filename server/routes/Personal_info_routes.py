from flask import request
from flask_restful import Resource, Api
from models import db, PersonalInfo

api = Api()

class PersonalInfoListResource(Resource):
    def get(self):
        personal_infos = PersonalInfo.query.all()
        return [pi.to_dict() for pi in personal_infos], 200

    def post(self):
        data = request.get_json()

        if not data or 'portfolio_id' not in data or 'name' not in data:
            return {'error': 'portfolio_id and name are required'}, 400

        new_pi = PersonalInfo(
            portfolio_id=data['portfolio_id'],
            name=data.get('name'),
            photo_url=data.get('photo_url'),
            contact_email=data.get('contact_email'),
            phone=data.get('phone'),
            linkedin=data.get('linkedin'),
            github=data.get('github'),
            website=data.get('website')
        )

        db.session.add(new_pi)
        db.session.commit()
        return new_pi.to_dict(), 201


class PersonalInfoResource(Resource):
    def delete(self, info_id):
        pi = PersonalInfo.query.get(info_id)
        if not pi:
            return {'error': 'PersonalInfo not found'}, 404

        db.session.delete(pi)
        db.session.commit()
        return {'message': 'PersonalInfo deleted successfully'}, 200


api.add_resource(PersonalInfoListResource, '/personal_info')
api.add_resource(PersonalInfoResource, '/personal_info/<int:info_id>')
