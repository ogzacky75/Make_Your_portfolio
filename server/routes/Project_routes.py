from flask import request
from flask_restful import Resource, Api
from models import db, Project

api = Api()

def serialize_project(project):
    return {
        "id": project.id,
        "portfolio_id": project.portfolio_id,
        "project_name": project.project_name,
        "description": project.description,
        "image_url": project.image_url,
        "project_link": project.project_link
    }

class ProjectListResource(Resource):
    def get(self):
        projects = Project.query.all()
        return [serialize_project(p) for p in projects], 200

    def post(self):
        data = request.get_json() or {}
        required_fields = ['portfolio_id', 'project_name', 'description']

        if not all(field in data for field in required_fields):
            return {'error': 'portfolio_id, project_name, and description are required'}, 400

        new_project = Project(
            portfolio_id=data['portfolio_id'],
            project_name=data['project_name'],
            description=data['description'],
            image_url=data.get('image_url'),
            project_link=data.get('project_link')
        )
        db.session.add(new_project)
        db.session.commit()
        return serialize_project(new_project), 201


class ProjectResource(Resource):
    def delete(self, project_id):
        project = Project.query.get(project_id)
        if not project:
            return {'error': 'Project not found'}, 404

        db.session.delete(project)
        db.session.commit()
        return {'message': 'Project deleted'}, 200


api.add_resource(ProjectListResource, '/projects')
api.add_resource(ProjectResource, '/projects/<int:project_id>')
