from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def first_name_exists(form, field):
    first_name = field.data
    user = User.query.filter(User.first_name == first_name)
    if user:
        raise ValidationError('First name is already in use').first()

def last_name_exists(form, field):
    last_name = field.data
    user = User.query.filter(User.last_name == last_name)
    if user:
        raise ValidationError('Last name is already in use').first()


class SignUpForm(FlaskForm):
    # username = StringField(
    #     'username', validators=[DataRequired(), username_exists])
    first_name = StringField('First Name', validators=[DataRequired(), first_name_exists])
    last_name = StringField('Last Name', validators=[DataRequired(), last_name_exists])
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired()])
    education = StringField('Education')
    # education_icon = StringField('Education Icon')
    profile_image = StringField('Profile Image Url')
    city = StringField("City")
    state = StringField("State")
    country = StringField("Country")
