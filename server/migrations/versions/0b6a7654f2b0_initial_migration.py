"""Initial migration

Revision ID: 0b6a7654f2b0
Revises: 
Create Date: 2025-10-28 17:09:34.092367
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0b6a7654f2b0'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String, nullable=False, unique=True),
        sa.Column('created_at', sa.DateTime),  # removed server_default
        sa.Column('updated_at', sa.DateTime)
    )

    op.create_table(
        'templates',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('preview_url', sa.Text, nullable=True)
    )

    op.create_table(
        'portfolios',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id')),
        sa.Column('template_id', sa.Integer, sa.ForeignKey('templates.id')),
        sa.Column('title', sa.String),
        sa.Column('slug', sa.String, nullable=False, unique=True),
        sa.Column('created_at', sa.DateTime),  # removed server_default
        sa.Column('updated_at', sa.DateTime)
    )


def downgrade():
    op.drop_table('portfolios')
    op.drop_table('templates')
    op.drop_table('users')
