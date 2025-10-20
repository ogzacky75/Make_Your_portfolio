from app import app
from models import db, User,Template, Favorite, Portfolio, PersonalInfo, Education, Experience, Project, Skill
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
        db.session.add_all([template1, template2, template3, template4])
        db.session.commit()

def seed_favorite():
    with app.db.app_context():
        favorite1 = Favorite(
            user_id = 1,
            template_id = 1  
        )

        favorite2 = Favorite(
            user_id = 2,
            template_id = 2
        )

        favorite3 = Favorite(
            user_id = 3,
            template_id = 3
        )

        favorite4 = Favorite(
            user_id = 4,
            favorite_id = 4
        )
        db.session.add_all([favorite1, favorite2, favorite3, favorite4])
        db.session.commit()

def seed_portfolio():
    with app.db.app_context():
        portfolios = Portfolio (
            user_id = 1,
            template_id = 1,
            title =  "Alex Johnson - Full Stack Developer",
            created_at = datetime.utcnow(),
            updated_at = datetime.utcnow()
        )

        Portfolio = Portfolio(
            user_id = 1,
            template_id = 2,
            title = "Sarah James - UX Designer",
            created_at = datetime.utcnow(),
            updated_at = datetime.utcnow()
        )

        Portfolio = Portfolio(
            user_id = 2,
            template_id  =3,
            title = "Alex Jake - Creative Projects",
            created_at = datetime.utcnow(),
            updated_at = datetime.utcnow()
        )

        Portfolio = Portfolio(
            user_id = 3,
            template_id = 4,
            title = "Jasmine Keith - Software Engineer",
            created_at = datetime.utcnow()
            updated_at = datetime.utcnow()
        )

        db.session.aadd_all([portfolios])
        db.session.commit()
        
