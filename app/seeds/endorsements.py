from app.models import db, Endorsement, environment, SCHEMA
from sqlalchemy.sql import text

def seed_endorsements():
    all_endorsements = [
        {'skill_id': 1, 'endorser_id': 3, 'endorsee_id': 1},
        {'skill_id': 2, 'endorser_id': 3, 'endorsee_id': 1},
        {'skill_id': 3, 'endorser_id': 3, 'endorsee_id': 1},
        {'skill_id': 9, 'endorser_id': 3, 'endorsee_id': 1},
        {'skill_id': 1, 'endorser_id': 4, 'endorsee_id': 1},
        {'skill_id': 2, 'endorser_id': 4, 'endorsee_id': 1},
        {'skill_id': 3, 'endorser_id': 4, 'endorsee_id': 1},
        {'skill_id': 9, 'endorser_id': 4, 'endorsee_id': 1},
        {'skill_id': 13, 'endorser_id': 1, 'endorsee_id': 3},
        {'skill_id': 14, 'endorser_id': 1, 'endorsee_id': 3},
        {'skill_id': 15, 'endorser_id': 1, 'endorsee_id': 3},
        {'skill_id': 18, 'endorser_id': 1, 'endorsee_id': 3},
    ]

    for endorsement in all_endorsements:
        new_endorsement = Endorsement(
            skill_id = endorsement['skill_id'],
            endorser_id = endorsement['endorser_id'],
            endorsee_id = endorsement['endorsee_id']
        )
        db.session.add(new_endorsement)
        db.session.commit()

def undo_endorsements():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.endorsements RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM endorsements"))

    db.session.commit()
