from flask import request, jsonify
from flask_restful import Resource, Api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User

api = Api()

class RegisterResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return {"error": "All fields are required"}, 400

        if User.query.filter((User.username == username) | (User.email == email)).first():
            return {"error": "Username or email already exists"}, 400

        user = User(username=username, email=email)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        return {"message": "User registered successfully"}, 201


class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return {"error": "Invalid email or password"}, 401

        access_token = create_access_token(identity=str(user.id))
        return {
            "message": "Login successful",
            "access_token": access_token,
            "user": {"id": user.id, "username": user.username, "email": user.email}
        }, 200


class MeResource(Resource):
    @jwt_required()
    def get(self):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        if not user:
            return {"error": "User not found"}, 404
        return {"id": user.id, "username": user.username, "email": user.email}, 200


class UserResource(Resource):
    @jwt_required()
    def get(self, user_id):
        """Get user profile by ID"""
        current_user_id = int(get_jwt_identity())
        
        if current_user_id != int(user_id):
            return {"error": "Unauthorized"}, 403
        
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404
        
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }, 200
    
    @jwt_required()
    def patch(self, user_id):
        """Update user profile"""
        current_user_id = int(get_jwt_identity())
        
        if current_user_id != int(user_id):
            return {"error": "Unauthorized"}, 403
        
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404
        
        data = request.get_json()
        
        if "username" in data:
            existing = User.query.filter(
                User.username == data["username"],
                User.id != user_id
            ).first()
            if existing:
                return {"error": "Username already taken"}, 400
            user.username = data["username"]
        
        if "password" in data and data["password"]:
            user.set_password(data["password"])
        
        db.session.commit()
        
        return {
            "message": "Profile updated successfully",
            "id": user.id,
            "username": user.username,
            "email": user.email
        }, 200


api.add_resource(RegisterResource, '/register')
api.add_resource(LoginResource, '/login')
api.add_resource(MeResource, '/me')
api.add_resource(UserResource, '/users/<int:user_id>')  