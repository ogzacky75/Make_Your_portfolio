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

        db.session.add_all([user1, user2, user3, user4])
        db.session.commit()
        print("Users seeded successfully.")

def seed_templates():
    with app.app_context():
        template1 = Template(
            name = 'Modern Portifolio',
            image = '',
            description = 'A sleek and modern portfolio template perfect for showcasing your work.'
        )

        template2 = Template(
            name = 'Creative Portfolio',
            image = '',
            description = 'A vibrant and creative portfolio template designed to highlight your unique style.'
        )

        template3 = Template(
            name = 'Professional Portfolio',
            image = '',
            description = 'A clean and professional portfolio template ideal for business presentations'
        )

        template4 = Template(
            name = 'Developer Portfolio',
            image = '',
            description = 'A teachnical and structured portfolio template tailored for developers. '
        )



