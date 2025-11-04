from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from uuid import uuid4

db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = (
        '-favorites.user',      
        '-portfolios.user',
    )

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)

    favorites = db.relationship('Favorite', back_populates='user', cascade='all, delete-orphan')
    portfolios = db.relationship('Portfolio', back_populates='user', cascade='all, delete-orphan')

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Template(db.Model, SerializerMixin):
    __tablename__ = 'templates'
    serialize_rules = (
        '-favorites.template',
        '-portfolios.template',
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.Text)
    description = db.Column(db.Text)
    preview_url = db.Column(db.Text)
    file_path = db.Column(db.String)

    favorites = db.relationship('Favorite', back_populates='template', cascade='all, delete-orphan')
    portfolios = db.relationship('Portfolio', back_populates='template', cascade='all, delete-orphan')


class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'
    serialize_rules = (
        '-user.favorites',
        '-template.favorites',
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    template_id = db.Column(db.Integer, db.ForeignKey('templates.id'))

    user = db.relationship('User', back_populates='favorites')
    template = db.relationship('Template', back_populates='favorites')


class Portfolio(db.Model, SerializerMixin):
    __tablename__ = 'portfolios'
    serialize_rules = (
        '-user.portfolios',
        '-template.portfolios',
        '-personal_info.portfolio',
        '-education.portfolio',
        '-experience.portfolio',
        '-projects.portfolio',
        '-skills.portfolio',
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    template_id = db.Column(db.Integer, db.ForeignKey('templates.id'))
    title = db.Column(db.String)
    slug = db.Column(db.String, unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='portfolios')
    template = db.relationship('Template', back_populates='portfolios')

    personal_info = db.relationship('PersonalInfo', back_populates='portfolio', uselist=False, cascade='all, delete-orphan')
    education = db.relationship('Education', back_populates='portfolio', cascade='all, delete-orphan')
    experience = db.relationship('Experience', back_populates='portfolio', cascade='all, delete-orphan')
    projects = db.relationship('Project', back_populates='portfolio', cascade='all, delete-orphan')
    skills = db.relationship('Skill', back_populates='portfolio', cascade='all, delete-orphan')

    def generate_slug(self, username):
        unique_part = uuid4().hex[:6]
        self.slug = f"{username}-{unique_part}"



class PersonalInfo(db.Model, SerializerMixin):
    __tablename__ = 'personal_info'
    serialize_rules = (
        '-portfolio.personal_info',
        '-portfolio.user',
        '-portfolio.template',
    )

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'))
    name = db.Column(db.String)
    photo_url = db.Column(db.Text)
    contact_email = db.Column(db.Text)
    phone = db.Column(db.String)
    linkedin = db.Column(db.Text)
    github = db.Column(db.Text)
    website = db.Column(db.Text)

    portfolio = db.relationship('Portfolio', back_populates='personal_info')


class Education(db.Model, SerializerMixin):
    __tablename__ = 'education'
    serialize_rules = (
        '-portfolio.education',
        '-portfolio.user',
        '-portfolio.template',
    )

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'))
    institution = db.Column(db.String)
    degree = db.Column(db.String)
    start_year = db.Column(db.String)
    end_year = db.Column(db.String)

    portfolio = db.relationship('Portfolio', back_populates='education')


class Experience(db.Model, SerializerMixin):
    __tablename__ = 'experience'
    serialize_rules = (
        '-portfolio.experience',
        '-portfolio.user',
        '-portfolio.template',
    )

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'))
    job_title = db.Column(db.String)
    company = db.Column(db.String)
    start_date = db.Column(db.String)
    end_date = db.Column(db.String)
    description = db.Column(db.Text)

    portfolio = db.relationship('Portfolio', back_populates='experience')


class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'
    serialize_rules = (
        '-portfolio.projects',
        '-portfolio.user',
        '-portfolio.template',
    )

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'))
    project_name = db.Column(db.String)
    description = db.Column(db.Text)
    image_url = db.Column(db.Text)
    project_link = db.Column(db.Text)

    portfolio = db.relationship('Portfolio', back_populates='projects')


class Skill(db.Model, SerializerMixin):
    __tablename__ = 'skills'
    serialize_rules = (
        '-portfolio.skills',
        '-portfolio.user',
        '-portfolio.template',
    )

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey('portfolios.id'))
    skill_name = db.Column(db.String)

    portfolio = db.relationship('Portfolio', back_populates='skills')
