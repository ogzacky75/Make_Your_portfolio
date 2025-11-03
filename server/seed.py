from app import create_app, db
from datetime import datetime
from werkzeug.security import generate_password_hash
from uuid import uuid4

from models import (
    User, Template, Favorite, Portfolio,
    PersonalInfo, Education, Experience, Project, Skill
)

app = create_app()


def generate_unique_slug(username):
    """Generate a unique slug using username + random ID."""
    unique_part = uuid4().hex[:6]
    return f"{username.lower().replace(' ', '-')}-{unique_part}"


def seed_users():
    users = [
        User(username='Jane James', email='janejames@gmail.com', password=generate_password_hash('janepassword23')),
        User(username='Nora Smith', email='norasmith@gmail.com', password=generate_password_hash('norapassword12')),
        User(username='Jade Keith', email='jadekeith@gmail.com', password=generate_password_hash('jadepassword45')),
        User(username='Liam Brown', email='liambrown@gmail.com', password=generate_password_hash('liampassword67'))
    ]
    db.session.add_all(users)
    db.session.commit()
    print("✅ Users seeded successfully.")

def seed_templates():
    templates = [
        Template(
            name='Modern Portfolio',
            image='https://yourcdn.com/images/modern.png',
            description='A sleek and modern portfolio template perfect for showcasing your work.',
            preview_url='/templates/modern'
        ),
        Template(
            name='Creative Portfolio',
            image='https://yourcdn.com/images/creative.png',
            description='A vibrant and creative portfolio template designed to highlight your unique style.',
            preview_url='/templates/creative'
        ),
        Template(
            name='Professional Portfolio',
            image='https://yourcdn.com/images/professional.png',
            description='A clean and professional portfolio template ideal for business presentations.',
            preview_url='/templates/professional'
        ),
        Template(
            name='Developer Portfolio',
            image='https://yourcdn.com/images/developer.png',
            description='A technical and structured portfolio template tailored for developers.',
            preview_url='/templates/developer'
        )
    ]
    db.session.add_all(templates)
    db.session.commit()
    print("Templates seeded successfully.")

def seed_favorites():
    favorites = [
        Favorite(user_id=1, template_id=1),
        Favorite(user_id=2, template_id=2),
        Favorite(user_id=3, template_id=3),
        Favorite(user_id=4, template_id=4),
    ]
    db.session.add_all(favorites)
    db.session.commit()
    print("✅ Favorites seeded successfully.")

def seed_portfolios():
    users = User.query.all()
    templates = Template.query.all()
    portfolios = []

    for i, user in enumerate(users):
        template = templates[i % len(templates)]
        title = f"{user.username} - {template.name}"
        portfolio = Portfolio(
            user_id=user.id,
            template_id=template.id,
            title=title,
            slug=generate_unique_slug(user.username)
        )
        portfolios.append(portfolio)

    db.session.add_all(portfolios)
    db.session.commit()
    print("Portfolios seeded successfully.")

def seed_personal_info():
    personal_info_list = [
        PersonalInfo(
            portfolio_id=1,
            name='Jane James',
            photo_url='https://yourcdn.com/images/jane.jpg',
            contact_email='janejames@gmail.com',
            phone='+254712345678',
            linkedin='https://linkedin.com/in/janejames',
            github='https://github.com/janejames',
            website='https://janejames.dev'
        ),
        PersonalInfo(
            portfolio_id=2,
            name='Nora Smith',
            photo_url='https://yourcdn.com/images/nora.jpg',
            contact_email='norasmith@gmail.com',
            phone='+254712987654',
            linkedin='https://linkedin.com/in/norasmith',
            github='https://github.com/norasmith',
            website='https://norasmith.design'
        ),
        PersonalInfo(
            portfolio_id=3,
            name='Jade Keith',
            photo_url='https://yourcdn.com/images/jade.jpg',
            contact_email='jadekeith@gmail.com',
            phone='+254713123456',
            linkedin='https://linkedin.com/in/jadekeith',
            github='https://github.com/jadekeith',
            website='https://jadekeith.io'
        ),
        PersonalInfo(
            portfolio_id=4,
            name='Liam Brown',
            photo_url='https://yourcdn.com/images/liam.jpg',
            contact_email='liambrown@gmail.com',
            phone='+254711223344',
            linkedin='https://linkedin.com/in/liambrown',
            github='https://github.com/liambrown',
            website='https://liambrownanalytics.com'
        ),
    ]
    db.session.add_all(personal_info_list)
    db.session.commit()
    print("Personal Info seeded successfully.")

def seed_education():
    education_list = [
        Education(portfolio_id=1, institution='University of Nairobi', degree='BSc Computer Science', start_year='2018', end_year='2022'),
        Education(portfolio_id=2, institution='JKUAT', degree='BA UX Design', start_year='2017', end_year='2021'),
        Education(portfolio_id=3, institution='Strathmore University', degree='BSc Software Engineering', start_year='2019', end_year='2023'),
        Education(portfolio_id=4, institution='Kenyatta University', degree='BSc Data Science', start_year='2016', end_year='2020'),
    ]
    db.session.add_all(education_list)
    db.session.commit()
    print("Education seeded successfully.")

def seed_experience():
    experience_list = [
        Experience(portfolio_id=1, job_title='Backend Developer', company='TechCorp', start_date='2022', end_date='Present', description='Developing REST APIs using Flask and PostgreSQL.'),
        Experience(portfolio_id=2, job_title='UX Designer', company='DesignStudio', start_date='2021', end_date='Present', description='Designing user-centered interfaces for mobile and web.'),
        Experience(portfolio_id=3, job_title='Software Engineer', company='InnovateX', start_date='2023', end_date='Present', description='Building scalable web applications with React and Flask.'),
        Experience(portfolio_id=4, job_title='Data Analyst', company='DataVision', start_date='2020', end_date='Present', description='Analyzing data to drive business decisions using Python and SQL.')
    ]
    db.session.add_all(experience_list)
    db.session.commit()
    print("Experience seeded successfully.")

def seed_projects():
    projects = [
        Project(portfolio_id=1, project_name='Portfolio Website', description='A modern portfolio built with React and Flask.', image_url='https://yourcdn.com/images/portfolio.png', project_link='https://github.com/janejames/portfolio'),
        Project(portfolio_id=2, project_name='UI Kit', description='Custom UI kit for rapid prototyping.', image_url='https://yourcdn.com/images/uikit.png', project_link='https://github.com/norasmith/uikit'),
        Project(portfolio_id=3, project_name='Task Manager', description='A task management app built with React.', image_url='https://yourcdn.com/images/task.png', project_link='https://github.com/jadekeith/taskmanager'),
        Project(portfolio_id=4, project_name='Data Dashboard', description='A real-time analytics dashboard for sales data.', image_url='https://yourcdn.com/images/dashboard.png', project_link='https://github.com/liambrown/dashboard')
    ]
    db.session.add_all(projects)
    db.session.commit()
    print("Projects seeded successfully.")

def seed_skills():
    skills = [
        Skill(portfolio_id=1, skill_name='Python'),
        Skill(portfolio_id=1, skill_name='Flask'),
        Skill(portfolio_id=2, skill_name='Figma'),
        Skill(portfolio_id=2, skill_name='Adobe XD'),
        Skill(portfolio_id=3, skill_name='React'),
        Skill(portfolio_id=3, skill_name='JavaScript'),
        Skill(portfolio_id=4, skill_name='SQL'),
        Skill(portfolio_id=4, skill_name='Pandas'),
    ]
    db.session.add_all(skills)
    db.session.commit()
    print("Skills seeded successfully.")


if __name__ == "__main__":
    with app.app_context():
        RESET_DB = True 
        if RESET_DB:
            print("Dropping existing tables...")
            db.drop_all()
            print("Creating new tables...")
            db.create_all()
        else:
            print("⏭ Skipping database reset...")

        seed_users()
        seed_templates()
        seed_favorites()
        seed_portfolios()
        seed_personal_info()
        seed_education()
        seed_experience()
        seed_projects()
        seed_skills()

        print("\n All data seeded successfully!")
