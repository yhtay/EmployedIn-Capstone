from flask import jsonify
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    post = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), default=None)
    created_at =  db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())

    # Relationships
    user = db.relationship("User", back_populates='posts')
    comments = db.relationship("Comment", back_populates='post')

    @property
    def get_comments(self):
        return jsonify([ comment.to_dict() for comment in self.comments ])

    def to_dict(self):
        return {
            'id': self.id,
            'post': self.post,
            'user_id': self.user_id,
            # 'comments': self.get_comments,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
