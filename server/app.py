import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
from flask_migrate import Migrate
from models import db

bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)

    basedir = os.path.abspath(os.path.dirname(__file__))
    
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'mysecretkey')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        if database_url.startswith("postgres://"):
            app.config['SQLALCHEMY_DATABASE_URI'] = database_url.replace("postgres://", "postgresql://", 1)
        else:
            app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(basedir, 'instance', 'app.db')}"

    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt_secret_key')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app)

    migrate = Migrate(app, db)

    from routes.User_routes import api as user_api
    from routes.Portfolio_routes import api as portfolio_api
    from routes.Template_routes import api as template_api
    from routes.Favorites_routes import api as favorite_api

    user_api.init_app(app)
    portfolio_api.init_app(app)
    template_api.init_app(app)
    favorite_api.init_app(app)

    @app.route("/")
    def index():
        return {"message": "Make Your Portfolio API running successfully 🎨"}

    return app


app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
