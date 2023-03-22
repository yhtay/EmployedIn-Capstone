from flask import Blueprint, jsonify, request
from app.models import User, db, Post
from app.forms import PostForm
from flask_login import login_required, current_user
from sqlalchemy.sql import select
from flask_cors import cross_origin


post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}: {error}')
    return errorMessages

# Get all posts
@post_routes.route('/')
@login_required
def get_all_posts():
    """ Route to get all posts """
    all_posts = Post.query.all()
    return all_posts.to_dict(), 200


# Create a post
@post_routes.route('/', methods=['POST'])
@login_required
def create_post():
    """
        Create Post for logged in user
    """
    form = PostForm()
    # Get csrf_token from the request cookie
    # form mannually to validat_on_submit
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            user_id = current_user.id,
            description = form.data['description'],
            image = form.data['image']
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Edit a post
@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    """
        Edit a Post for logged in user
    """
    post_by_id = Post.query.get(id)

    # Check if post exist
    if not post_by_id:
        return {'errors': validation_errors_to_error_messages("Post Not Found")}, 404

    # Check if authorized
    if post_by_id != current_user.id:
        return {'errors': validation_errors_to_error_messages("Unauthroized to Edit")}, 403

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post_by_id.description = form.description.data
        post_by_id.image = form.image.data
        db.session.commit()
        return post_by_id.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Delete a post
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    """
        Delete a Post for logged in user
    """
    post_to_delete = Post.query.get(id)
    # Check if post exist
    if not post_to_delete:
        return {'errors': validation_errors_to_error_messages("Post Not Found")}, 404
    # Check if authorized
    if post_to_delete != current_user.id:
        return {'errors': validation_errors_to_error_messages("Unauthroized to Delete")}, 403

    db.session.delete(post_to_delete)
    db.session.commit()
    return {'message': "Successfully deleted the post"}, 200
