from flask import request
from flask_restful import Resource, Api
from models import db, Project

api = Api()

class ProjectListResource(Resource):
    def get(self):
        projects = Project.query.all()
        return [p.to_dict() for p in projects], 200

    def post(self):
        data = request.get_json()
        required_fields = ['portfolio_id', 'project_name', 'description']

        if not data or not all(field in data for field in required_fields):
            return {'error': 'portfolio_id, project_name, and description are required'}, 400

        new_p = Project(
            portfolio_id=data['portfolio_id'],
            project_name=data['project_name'],
            description=data.get('description'),
            image_url=data.get('image_url'),
            project_link=data.get('project_link')
        )

        db.session.add(new_p)
        db.session.commit()
        return new_p.to_dict(), 201


class ProjectResource(Resource):
    def delete(self, project_id):
        p = Project.query.get(project_id)
        if not p:
            return {'error': 'Project not found'}, 404

        db.session.delete(p)
        db.session.commit()
        return {'message': 'Project deleted'}, 200


api.add_resource(ProjectListResource, '/projects')
api.add_resource(ProjectResource, '/projects/<int:project_id>')
