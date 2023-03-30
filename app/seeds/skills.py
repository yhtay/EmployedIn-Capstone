from app.models import db, Skill, environment, SCHEMA
from sqlalchemy.sql import text

def seed_skills():
    all_skills = [
        {'skill': 'Dribbling'},
        {'skill': 'Passing'},
        {'skill': 'Shooting'},
        {'skill': 'Heading'},
        {'skill': 'Tackling'},
        {'skill': 'Positioning'},
        {'skill': 'Agility'},
        {'skill': 'Endurance'},
        {'skill': 'Ball control'},
        {'skill': 'Teamwork'},
        {'skill': 'Speed'},
        {'skill': 'Vision'},
        {'skill': 'Ball reception'},
        {'skill': 'Tactical awareness'},
        {'skill': 'Communication'},
        {'skill': 'Leadership'},
        {'skill': 'Balance'},
        {'skill': 'Flexibility'},
        {'skill': 'Stamina'},
        {'skill': 'Game intelligence'},
        {'skill': 'Free Kick'},
        {'skill': 'Penalty Kick'}
    ]

    for skill in all_skills:
        new_skill = Skill(
            skill = skill['skill']
        )
        db.session.add(new_skill)
        db.session.commit()

def undo_skills():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM skills"))

    db.session.commit()
