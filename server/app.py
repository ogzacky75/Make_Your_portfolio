from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
import os

from models import db

from routes.Skill_routes import api as skill_api
from routes.Education_routes import api as education_api
from routes.Experience_routes import api as experience_api
from routes.Project_routes import api as project_api
from routes.User_routes import api as user_api
from routes.Portfolio_routes import api as portfolio_api
from routes.Template_routes import api as template_api
from routes.Favorites_routes import api as favorite_api

bcrypt = Bcrypt()
jwt = JWTManager()



def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'mysecretkey')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt_secret_key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app)

    skill_api.init_app(app)
    education_api.init_app(app)
    experience_api.init_app(app)
    project_api.init_app(app)
    user_api.init_app(app)
    portfolio_api.init_app(app)
    template_api.init_app(app)
    favorite_api.init_app(app)

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
