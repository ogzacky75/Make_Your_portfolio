from flask import request
from flask_restful import Resource, Api
from models import db, User

api = Api()

class UserListResource(Resource):
    def get(self):
        users = User.query.all()
        return [user.to_dict() for user in users], 200

    def post(self):
        data = request.get_json()
        required = ('username', 'email', 'password')
        if not data or not all(k in data for k in required):
            return {'error': 'username, email, and password are required'}, 400

        new_user = User(**{k: data[k] for k in required})
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(), 201


class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        return user.to_dict(), 200

    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}, 200

    def patch(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        data = request.get_json() or {}

        for field in ('username', 'email', 'password'):
            if field in data:
                setattr(user, field, data[field])
        db.session.commit()
        return user.to_dict(), 200


api.add_resource(UserListResource, '/users')
api.add_resource(UserResource, '/users/<int:user_id>')
