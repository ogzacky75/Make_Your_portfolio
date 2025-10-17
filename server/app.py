from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask bcrypt import Bcrypt
from flask jwt extended import JWTExtended, create_access_token, jwt_rewuired,get_jwt_identity
from flask cors import CORS
from datetime import datetime, timedelta
import os

app = FLASK(__name__)
app.config['SECRET_KEY']=os.environ.get['SECRET_KEY'
app.config['SQLALCHEMY_MODIFICATIONS_TRACK'] = False
app.config['SQLALCHEMY_DATABASE_URI']= os.environ.get('DATABASE_URL')or 'sqlite:////app.db'
app.config['JWT_SECRET_KEY']= os.environ.het('JWT_SECRET_KEY')or 'jwt_secret_key'
app.config('JWT_ACCESS_TOKEN_EXPIRES') = timedelta = (hours=1)

db = SQLALlhemy(app)
bcrypt = Bcrypt(app)
jwt = JWTExtended(app)
CORS = app
