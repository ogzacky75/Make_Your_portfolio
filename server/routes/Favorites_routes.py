from flask import request
from flask_restful import Resource, Api
from models import db, Favorite, User, Template
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Api()


def serialize_favorite(fav):
    return {
        "id": fav.id,
        "user_id": fav.user_id,
        "template_id": fav.template_id,
        "user": {"id": fav.user.id, "username": fav.user.username} if fav.user else None,
        "template": {"id": fav.template.id, "name": fav.template.name} if fav.template else None
    }


class FavoriteListResource(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        favorites = Favorite.query.filter_by(user_id=current_user_id).all()
        return [serialize_favorite(fav) for fav in favorites], 200

    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()
        data = request.get_json()
        template_id = data.get("template_id")

        template = Template.query.get(template_id)
        if not template:
            return {"error": "Template not found"}, 404

        existing_fav = Favorite.query.filter_by(user_id=current_user_id, template_id=template_id).first()
        if existing_fav:
            return {"message": "Template already favorited"}, 200

        fav = Favorite(user_id=current_user_id, template_id=template_id)
        db.session.add(fav)
        db.session.commit()

        return {"message": "Template added to favorites"}, 201


class FavoriteDetailResource(Resource):
    @jwt_required()
    def delete(self, template_id):
        current_user_id = get_jwt_identity()
        favorite = Favorite.query.filter_by(user_id=current_user_id, template_id=template_id).first()

        if not favorite:
            return {"error": "Favorite not found"}, 404

        db.session.delete(favorite)
        db.session.commit()
        return {"message": "Template removed from favorites"}, 200
    


api.add_resource(FavoriteListResource, '/favorites')
api.add_resource(FavoriteDetailResource, '/favorites/<int:template_id>')