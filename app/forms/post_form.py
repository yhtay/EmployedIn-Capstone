from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Post


class PostForm(FlaskForm):
    post = TextAreaField('Post',
        validators=[DataRequired(), Length(max=500, message="Maximum 500 characters allowed")])
    image = StringField('Image')
