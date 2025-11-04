# Make_Your_Portfolio

Make Your Portfolio is a web application that helps users quickly create a personalized portfolio website.
All you have to do is fill in your personal and professional details, and the app will automatically generate a complete portfolio using your chosen template.

# Technologies Used
Frontend (Client)

Vite + React.js – for a fast and modern frontend

Tailwind CSS – for beautiful, responsive designs

React Router DOM – for smooth page navigation

Backend (Server)

Flask (Python) – RESTful API for handling data

Flask SQLAlchemy – database ORM

Flask Migrate – database migrations

PostgreSQL – database

Render – backend hosting

# App Pages

The app includes the following pages:

Landing Page – Welcome screen where users can log in or sign up

Login Page – For existing users to sign in

Signup Page – For new users to create an account

Homepage – Shows templates and quick actions

Templates Page – View and choose from available portfolio templates

Favorites Page – Saved templates you like

My Portfolios Page – Displays all your created portfolios

Create Portfolio Page – Fill in your personal info, education, projects, and skills

Portfolio Page – Displays your final generated portfolio

# How It Works

Start at the Landing Page and choose to log in or sign up.

Once logged in, you’ll land on the Homepage, where you can browse templates.

Pick a template that fits your style from the Templates Page.

Go to Create Portfolio, fill in your details, and generate your portfolio.

Your custom portfolio will be created instantly — complete with your information and chosen template.

You can view, save, or favorite templates for future use.

# Database Overview

The backend uses PostgreSQL, and the database includes:

Users – stores user accounts

Templates – contains available portfolio templates

Favorites – stores user-saved templates

Portfolios – generated portfolio data

Education, Experience, Projects, Skills, Personal Info – detailed sections of a portfolio

# How to Run the Project

# Backend Setup

cd server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
flask db upgrade
python3 seed.py
flask run

# Frontend Setup

cd client
npm install
npm run dev

# Deployment

Frontend: https://cheerful-lokum-f6916c.netlify.app/

Backend: https://make-your-portfolio.onrender.com

Database: PostgreSQL on Render

# Features

User authentication (Login/Signup)
Portfolio generation from templates
Template previews and favorites
Editable portfolio information
Responsive design
PostgreSQL database for persistence

# Future Improvements

Allow users to upload custom templates
Add drag-and-drop portfolio customization
Enable direct portfolio hosting with custom links
Add AI-assisted bio and project description suggestions

# Team

Project by:

Isaac Ogutu – Full Stack Developer
Brenda Ngunjiri - Full Stack Developer
Mathu Alex - Full Stack Developer
