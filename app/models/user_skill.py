from .db import db, environment, SCHEMA, add_prefix_for_prod


users_skills = db.Table(
    'users_skills',

    db.Column('user_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
        ),

    db.Column('skill_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('skills.id'), ondelete='CASCADE'),
        primary_key=True
        )
)

if environment == "production":
    users_skills.schema = SCHEMA
