from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length
from app.models import Comment


class CommentForm(FlaskForm):
    comment = TextAreaField('Comment',
        validators=[DataRequired(), Length(max=500, message="Maximum 500 characters allowed")])
    image = StringField('Image')
