from flask import request
from flask_restful import Resource, Api
from models import db, Skill

api = Api()

class SkillListResource(Resource):
    def get(self):
        skills = Skill.query.all()
        return [s.to_dict() for s in skills], 200

    def post(self):
        data = request.get_json() or {}
        if 'skill_name' not in data or 'portfolio_id' not in data:
            return {'error': 'portfolio_id and skill_name are required'}, 400

        s = Skill(
            portfolio_id=data['portfolio_id'],
            skill_name=data['skill_name']
        )
        db.session.add(s)
        db.session.commit()
        return s.to_dict(), 201

class SkillResource(Resource):
    def patch(self, skill_id):
        s = Skill.query.get(skill_id)
        if not s:
            return {'error': 'Skill not found'}, 404

        data = request.get_json()
        s.skill_name = data.get('skill_name', s.skill_name)
        db.session.commit()
        return s.to_dict(), 200

    def delete(self, skill_id):
        s = Skill.query.get(skill_id)
        if not s:
            return {'error': 'Skill not found'}, 404
        db.session.delete(s)
        db.session.commit()
        return {'message': 'Skill deleted'}, 200

api.add_resource(SkillListResource, '/skills')
api.add_resource(SkillResource, '/skills/<int:skill_id>')
