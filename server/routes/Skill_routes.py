from flask import request
from flask_restful import Resource, Api
from models import db, Skill

api = Api()

def serialize_skill(skill):
    return {
        "id": skill.id,
        "portfolio_id": skill.portfolio_id,
        "skill_name": skill.skill_name
    }

class SkillListResource(Resource):
    def get(self):
        skills = Skill.query.all()
        return [serialize_skill(s) for s in skills], 200

    def post(self):
        data = request.get_json() or {}
        if 'skill_name' not in data or 'portfolio_id' not in data:
            return {'error': 'portfolio_id and skill_name are required'}, 400

        new_skill = Skill(
            portfolio_id=data['portfolio_id'],
            skill_name=data['skill_name']
        )
        db.session.add(new_skill)
        db.session.commit()
        return serialize_skill(new_skill), 201

class SkillResource(Resource):
    def patch(self, skill_id):
        skill = Skill.query.get(skill_id)
        if not skill:
            return {'error': 'Skill not found'}, 404

        data = request.get_json() or {}
        skill.skill_name = data.get('skill_name', skill.skill_name)
        db.session.commit()
        return serialize_skill(skill), 200

    def delete(self, skill_id):
        skill = Skill.query.get(skill_id)
        if not skill:
            return {'error': 'Skill not found'}, 404

        db.session.delete(skill)
        db.session.commit()
        return {'message': 'Skill deleted'}, 200

api.add_resource(SkillListResource, '/skills')
api.add_resource(SkillResource, '/skills/<int:skill_id>')
