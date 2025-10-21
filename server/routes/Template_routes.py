from flask import request
from flask_restful import Resource, Api
from models import db, Template

api = Api()

def serialize_template(template):
    return {
        "id": template.id,
        "name": template.name,
        "image": template.image,
        "description": template.description
    }


class TemplateListResource(Resource):
    def get(self):
        templates = Template.query.all()
        return [serialize_template(t) for t in templates], 200

    def post(self):
        data = request.get_json() or {}
        if not data.get("name"):
            return {"error": "Template name is required"}, 400

        new_template = Template(
            name=data.get("name"),
            image=data.get("image"),
            description=data.get("description")
        )
        db.session.add(new_template)
        db.session.commit()
        return serialize_template(new_template), 201


class TemplateResource(Resource):
    def delete(self, template_id):
        template = Template.query.get(template_id)
        if not template:
            return {"error": "Template not found"}, 404

        db.session.delete(template)
        db.session.commit()
        return {"message": "Template deleted"}, 200


api.add_resource(TemplateListResource, "/templates")
api.add_resource(TemplateResource, "/templates/<int:template_id>")
