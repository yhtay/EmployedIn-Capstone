from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length
from app.models import Comment


class CommentForm(FlaskForm):
    comment = TextAreaField('Comment',
        validators=[DataRequired(), Length(min=1, max=100, message="Comments must be between 1 and 30 characters")])
    # image = StringField('Image')
