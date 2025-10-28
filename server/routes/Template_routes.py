from flask import request
from flask_restful import Resource, Api
from flask_jwt_extended import jwt_required
from models import db, Template

api = Api()

def serialize_template(template):
    return {
        "id": template.id,
        "name": template.name,
        "image": template.image,
        "description": template.description,
        "preview_url": template.preview_url
    }

class TemplateListResource(Resource):
    @jwt_required()
    def get(self):
        templates = Template.query.all()
        return [serialize_template(t) for t in templates], 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        name = data.get("name")
        image = data.get("image")
        description = data.get("description")
        preview_url = data.get("preview_url")

        if not name:
            return {"error": "Template name is required"}, 400

        template = Template(
            name=name,
            image=image,
            description=description,
            preview_url=preview_url
        )

        db.session.add(template)
        db.session.commit()

        return {"message": "Template added successfully", "template": serialize_template(template)}, 201


class TemplateDetailResource(Resource):
    @jwt_required()
    def get(self, id):
        template = Template.query.get(id)
        if not template:
            return {"error": "Template not found"}, 404
        return serialize_template(template), 200


api.add_resource(TemplateListResource, '/templates')
api.add_resource(TemplateDetailResource, '/templates/<int:id>')
