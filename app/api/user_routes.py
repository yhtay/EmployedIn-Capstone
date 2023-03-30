from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Skill, users_skills, db
from app.forms import SkillForm


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return [user.to_dict() for user in users]
    # return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    print("user.skills: ", user.skills)
    return user.to_dict()

# Get skills by user id
@user_routes.route('/<int:id>/skills')
# @login_required
def get_skills_by_user_id(id):
    """
    Query for specific user and return their skills in an array
    """
    user_by_id = User.query.get(id)
    if not user_by_id:
        return {'error': 'User not found'}, 404

    # if user_by_id.id != current_user.id:
    #     return {'error': 'Unauthorized'}, 403

    skills = [ skill.to_dict() for skill in user_by_id.skills]
    return jsonify(skills), 200

# Get skills new skills for the user
@user_routes.route('/<int:id>/new_skills')
# @login_required
def get_new_skills(id):
    """
    Query for all skills then query for user's skills then filter out new skills for user
    """
    all_skills = Skill.query.all()
    user_skills = User.query.get(id).skills
    if not user_skills:
        return {'error': 'User not found'}, 404

    new_skills = [ skill.to_dict() for skill in all_skills if skill not in user_skills ]
    return new_skills


# Create skills based on user id
@user_routes.route('/<int:user_id>/skills/<int:skill_id>', methods=['POST'])
# @login_required
def add_skill_to_user(user_id, skill_id):
    """
    Create skill on user for logged in user
    """
    skill_to_add = users_skills.insert().values(
        user_id = user_id,
        skill_id = skill_id
    )
    db.session.execute(skill_to_add)
    db.session.commit()

    return User.query.get(user_id).to_dict()


# Delete skills based on user id
@user_routes.route('/<int:user_id>/skills/<int:skill_id>', methods=['DELETE'])
# @login.required
def delete_skill_on_user(user_id, skill_id):
    skill_to_delete = users_skills.delete().where(
        (users_skills.c.user_id == user_id) &
        (users_skills.c.skill_id == skill_id)
    )
    db.session.execute(skill_to_delete)
    db.session.commit()

    return User.query.get(user_id).to_dict()
