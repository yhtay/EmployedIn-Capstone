from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from app.models import skill


class SkillForm(FlaskForm):
    skill = StringField('Skill', validators=[DataRequired(), Length(min=1, max=15, message="Skills must be between 1 and 15 characters")])
