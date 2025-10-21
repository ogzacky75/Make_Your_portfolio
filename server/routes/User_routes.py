from flask import request
from flask_restful import Resource, Api
from models import db, User
from werkzeug.security import generate_password_hash

api = Api()


def serialize_portfolio(portfolio):
    return {
        "id": portfolio.id,
        "title": portfolio.title,
        "skills": [{"id": s.id, "skill_name": s.skill_name} for s in getattr(portfolio, "skills", [])],
        "education": [
            {
                "id": e.id,
                "institution": e.institution,
                "degree": e.degree,
                "start_year": e.start_year,
                "end_year": e.end_year
            } for e in getattr(portfolio, "education", [])
        ],
        "experience": [
            {
                "id": ex.id,
                "job_title": ex.job_title,
                "company": ex.company,
                "start_date": ex.start_date,
                "end_date": ex.end_date,
                "description": ex.description
            } for ex in getattr(portfolio, "experience", [])
        ],
        "projects": [
            {
                "id": pr.id,
                "project_name": pr.project_name,
                "description": pr.description,
                "image_url": pr.image_url,
                "project_link": pr.project_link
            } for pr in getattr(portfolio, "projects", [])
        ]
    }


def serialize_user(user):
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "portfolios": [serialize_portfolio(p) for p in getattr(user, "portfolios", [])]
    }



class UserListResource(Resource):
    def get(self):
        users = User.query.all()
        return [serialize_user(u) for u in users], 200

    def post(self):
        data = request.get_json() or {}
        required = ("username", "email", "password")
        if not all(k in data for k in required):
            return {"error": "username, email, and password are required"}, 400

        hashed_password = generate_password_hash(data["password"])
        new_user = User(
            username=data["username"],
            email=data["email"],
            password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()
        return serialize_user(new_user), 201


class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404
        return serialize_user(user), 200

    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        db.session.delete(user)
        db.session.commit()
        return {"message": "User deleted successfully"}, 200

    def patch(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        data = request.get_json() or {}

        if "username" in data:
            user.username = data["username"]
        if "email" in data:
            user.email = data["email"]
        if "password" in data:
            user.password = generate_password_hash(data["password"])

        db.session.commit()
        return serialize_user(user), 200


api.add_resource(UserListResource, "/users")
api.add_resource(UserResource, "/users/<int:user_id>")
