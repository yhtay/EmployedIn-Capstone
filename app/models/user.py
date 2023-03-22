from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    education = db.Column(db.String(255))
    education_icon = db.Column(db.String(255), default="https://upload.wikimedia.org/wikipedia/commons/7/7e/Appacademylogo.png")
    profile_image = db.Column(db.String(255), default="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg")
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))
    country = db.Column(db.String(255))
    created_at =  db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())

    # Relationships
    posts = db.relationship("Post", back_populates='user')
    comments = db.relationship("Comment", back_populates='user')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @property
    def get_posts(self):
        return [ post.to_dict() for post in self.posts ]

    @property
    def get_comments(self):
        return [ comment.to_dict() for comment in self.comments ]

    def to_dict(self):
        return {
            'id': self.id,
            # 'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'education': self.education,
            'education_icon': self.education_icon,
            'profile_image': self.profile_image,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            # 'posts': self.get_posts,
            # 'comments': self.get_comments
        }
