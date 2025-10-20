from app import app
from models import db, User,Template, Favorite,Portfolio, PersonalInfo, Education, Experience, Project, Skill
from datetime import datetime, date

def seed_users():
    with app.app_context():
        user1 = User(
            username = 'Jane James',
            email = 'janeJames@gmail.com'
        )
        user1.set_password('janepassword23')

        user2 = User(
            username = 'Nora Smith',
            email = 'noraSmith@gmail.com'
        )
        user2.set_password('norapasssword12')

        user3 = User(
            username = 'Jade Keith',
            email = 'jadeKeith@gmail.com'
        )
        user3.set_password('jadepassword45')

        user4 = User(
            username = 'Liam Brown',
            email = 'liamBrown@gmail.com'
        )
        user4.set_password('liampassword67')
