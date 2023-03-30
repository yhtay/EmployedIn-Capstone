from flask import jsonify
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user_skill import users_skills


class Skill(db.Model):
    __tablename__ = "skills"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    skill = db.Column(db.String(40), nullable=False)
    created_at =  db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())

    # Relationships
    users = db.relationship("User",
        secondary=users_skills,
        back_populates='skills'
        )

    def to_dict(self):
        return {
            'id': self.id,
            'skill': self.skill,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
