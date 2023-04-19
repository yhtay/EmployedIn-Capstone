from flask import jsonify
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Endorsement(db.Model):
    __tablename__ = "endorsements"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    skill_id = db.Column(db.Integer,
        db.ForeignKey(add_prefix_for_prod('skills.id'), ondelete='CASCADE'),
        nullable=False)
    endorser_id = db.Column(db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'),
        nullable=False)
    endorsee_id = db.Column(db.Integer,
        # db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'),
        nullable=False)

    # Relationships
    skill = db.relationship("Skill", back_populates='endorsements')
    endorser = db.relationship('User', back_populates='give_endorsements')
    endorsee = db.relationship('User', back_populates='recieve_endorsements')

    def to_dict(self):
        return {
            'id': self.id,
            'skill': self.skill.to_dict(),
            'endorser': self.endorser.to_dict(),
            'endorsee': self.endorsee.to_dict()
        }
