from flask import request
from flask_restful import Resource, Api
from models import db, Favorite

api = Api()

class FavoriteListResource(Resource):
    def get(self):
        favorites = Favorite.query.all()
        return [f.to_dict() for f in favorites], 200

    def post(self):
        data = request.get_json()
        fav = Favorite(user_id=data.get('user_id'), template_id=data.get('template_id'))
        db.session.add(fav)
        db.session.commit()
        return fav.to_dict(), 201

class FavoriteResource(Resource):
    def delete(self, favorite_id):
        fav = Favorite.query.get(favorite_id)
        if not fav:
            return {'error': 'Favorite not found'}, 404
        db.session.delete(fav)
        db.session.commit()
        return {'message': 'Favorite deleted'}, 200

api.add_resource(FavoriteListResource, '/favorites')
api.add_resource(FavoriteResource, '/favorites/<int:favorite_id>')
