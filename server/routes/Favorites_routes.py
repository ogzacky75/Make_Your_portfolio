from flask import request
from flask_restful import Resource, Api
from models import db, Favorite, User, Template

api = Api()


# --- SERIALIZER --- #
def serialize_favorite(fav):
    return {
        "id": fav.id,
        "user_id": fav.user_id,
        "template_id": fav.template_id,
        "user": {"id": fav.user.id, "username": fav.user.username} if fav.user else None,
        "template": {"id": fav.template.id, "name": fav.template.name} if fav.template else None
    }


# --- RESOURCES --- #
class FavoriteListResource(Resource):
    def get(self):
        favorites = Favorite.query.all()
        return [serialize_favorite(f) for f in favorites], 200

    def post(self):
        data = request.get_json() or {}
        user_id = data.get("user_id")
        template_id = data.get("template_id")

        if not user_id or not template_id:
            return {"error": "user_id and template_id are required"}, 400

        # Optional: check if user and template exist
        if not User.query.get(user_id):
            return {"error": "User not found"}, 404
        if not Template.query.get(template_id):
            return {"error": "Template not found"}, 404

        fav = Favorite(user_id=user_id, template_id=template_id)
        db.session.add(fav)
        db.session.commit()
        return serialize_favorite(fav), 201


class FavoriteResource(Resource):
    def delete(self, favorite_id):
        fav = Favorite.query.get(favorite_id)
        if not fav:
            return {"error": "Favorite not found"}, 404

        db.session.delete(fav)
        db.session.commit()
        return {"message": "Favorite deleted"}, 200


# --- REGISTER RESOURCES --- #
api.add_resource(FavoriteListResource, "/favorites")
api.add_resource(FavoriteResource, "/favorites/<int:favorite_id>")
