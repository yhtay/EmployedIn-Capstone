from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Post


class PostForm(FlaskForm):
    post = TextAreaField('Post',
        validators=[DataRequired(), Length(min=1, max=500, message="Post must be between 1 and 500 characters")])
    image = StringField('Image')
