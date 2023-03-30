from app.models import db, environment, SCHEMA, users_skills
from sqlalchemy.sql import text


def seed_users_skills():

    all_users_skills = [
        {'user_id': 1, 'skill_id': 1},
        {'user_id': 1, 'skill_id': 2},
        {'user_id': 1, 'skill_id': 3},
        {'user_id': 1, 'skill_id': 9},
        {'user_id': 1, 'skill_id': 15},
        {'user_id': 1, 'skill_id': 21},
        {'user_id': 1, 'skill_id': 22},
        {'user_id': 2, 'skill_id': 21},
        {'user_id': 2, 'skill_id': 22},
        {'user_id': 2, 'skill_id': 7},
        {'user_id': 2, 'skill_id': 8},
        {'user_id': 2, 'skill_id': 9},
        {'user_id': 2, 'skill_id': 10},
        {'user_id': 2, 'skill_id': 11},
        {'user_id': 2, 'skill_id': 12},
        {'user_id': 3, 'skill_id': 13},
        {'user_id': 3, 'skill_id': 14},
        {'user_id': 3, 'skill_id': 15},
        {'user_id': 3, 'skill_id': 16},
        {'user_id': 3, 'skill_id': 17},
        {'user_id': 3, 'skill_id': 18},
        {'user_id': 4, 'skill_id': 19},
        {'user_id': 4, 'skill_id': 20},
        {'user_id': 4, 'skill_id': 21},
        {'user_id': 4, 'skill_id': 22},
        {'user_id': 4, 'skill_id': 17},
        {'user_id': 4, 'skill_id': 15},
        {'user_id': 5, 'skill_id': 16},
        {'user_id': 5, 'skill_id': 20},
        {'user_id': 5, 'skill_id': 1},
        {'user_id': 5, 'skill_id': 5},
        {'user_id': 5, 'skill_id': 7},
        {'user_id': 5, 'skill_id': 10},
        {'user_id': 6, 'skill_id': 6},
        {'user_id': 6, 'skill_id': 3},
        {'user_id': 6, 'skill_id': 22},
        {'user_id': 6, 'skill_id': 21}
    ]

    for data in all_users_skills:
        skill = users_skills.insert().values(
            user_id = data['user_id'],
            skill_id = data['skill_id']
        )
        db.session.execute(skill)

    db.session.commit()


def undo_users_skills():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users_skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users_skills"))

    db.session.commit()
