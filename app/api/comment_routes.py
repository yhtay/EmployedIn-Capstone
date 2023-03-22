from flask import Blueprint, jsonify, request
from app.models import User, db, Comment
from app.forms import CommentForm
from flask_login import login_required, current_user
from sqlalchemy.sql import select
from flask_cors import cross_origin


comment_routes = Blueprint('comments', __name__)

# Error
def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all Comments
@comment_routes.route('/')
def get_all_comments():
    """ Route to get all comments """
    all_comments = Comment.query.all()
    return all_comments.to_dict()


