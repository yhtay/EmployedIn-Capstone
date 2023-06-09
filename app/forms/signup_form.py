from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from email_validator import validate_email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    if not validate_email(email):
        raise ValidationError('Invalid email address')
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')

# def first_name_exists(form, field):
#     first_name = field.data
#     user = User.query.filter(User.first_name == first_name)
#     if user:
#         raise ValidationError('First name is already in use').first()

# def last_name_exists(form, field):
#     last_name = field.data
#     user = User.query.filter(User.last_name == last_name)
#     if user:
#         raise ValidationError('Last name is already in use').first()


class SignUpForm(FlaskForm):
    # username = StringField(
    #     'username', validators=[DataRequired(), username_exists])
    first_name = StringField('First Name', validators=[DataRequired(), Length(max=15, message="First name 15 characters max")])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(max=15, message="Last name 15 characters max")])
    email = StringField('Email', validators=[DataRequired(), user_exists])
    password = StringField('Password', validators=[DataRequired(), Length(min=6, message="Password must be 6 characters min")])
    education = StringField('Education', validators=[DataRequired()])
    # education_icon = StringField('Education Icon')
    profile_image = StringField('Profile Image Url')
    city = StringField("City", validators=[DataRequired()])
    state = StringField("State", validators=[DataRequired(), Length(max=4, message="State can have 4 characters max")])
    country = StringField("Country", validators=[DataRequired()])
