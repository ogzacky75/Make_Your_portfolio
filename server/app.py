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

from models import Users, Templates, Education, Degree, Portfolios, Experience, Projects, Personal_information, Skills

#Creates Authentication Routes
@app.route('/api/auth/register', methods=[POST])
def register():
    try: 
        data = request.get_json()

        if User.query.filter_by(username=data['name']).first():
            return jsonify({'error': 'Username already exists'}), 400

        if User.query.filter_by(email.data['email'].first()):
            return jsonify({'error': 'Email already exists'}), 400

        user = User(username=data['username'], email=data['email'])
        user.set_password(data['password'])

        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully', 'user_id': user.id}),201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/auth/login', methods=[POST])
def login():
    try:
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()

        if user and user.check_password(data['password']):
            acccess_token = create_access_token(identity=user.id)
            return jsonify({
                'access_token': access_token,
                'user':{
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }), 200
        return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/personal-info', methods=[POST])
@jwt_required()
def get_personal_info():
    user_id = get_jwt_identity()
    info = PersonalInformation.query.filter_by(user_id=user_id).first()

    if not info:
        return jsonify({'error': 'Personal information not found'}), 404

    return jsonify({
        'id': info.id,
        'first_name': info.first_name,
        'last_name': info.last_name,
        'phone': info.phone,
        'location': info.location,
        'bio': info.bio,
        'profile_picture': info.profile_picture,
        'linked_url': info.linked_url,
        'github_url': info.github_url,
    
    }), 200

