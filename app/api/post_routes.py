from flask import Blueprint, jsonify, request
from app.models import User, db, Post, Comment
from app.forms import PostForm, CommentForm
from flask_login import login_required, current_user
from sqlalchemy.sql import select
from flask_cors import cross_origin


post_routes = Blueprint('posts', __name__)

# Error
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
    post_dicts = [ post.to_dict() for post in all_posts ]
    return post_dicts, 200


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
            post = form.data['post'],
            image = form.data['image']
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.to_dict())

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
    if post_by_id.user_id != current_user.id:
        return {'errors': validation_errors_to_error_messages("Unauthroized to Edit")}, 403

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post_by_id.post = form.post.data
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
        return {'errors': validation_errors_to_error_messages("Post Not Found")}
    # Check if authorized
    if post_to_delete.user_id != current_user.id:
        return {'errors': validation_errors_to_error_messages("Unauthroized to Delete")}

    db.session.delete(post_to_delete)
    db.session.commit()
    return {'message': "Successfully deleted the post"}, 200


# Get comments based on post id
@post_routes.route('/<int:id>/comments')
@login_required
def get_comment_by_post_id(id):
    post_by_id = Post.query.get(id)
    if not post_by_id:
        return {'errors': validation_errors_to_error_messages("Post Not Found")}, 404

    if post_by_id != current_user.id:
        return {'errors': validation_errors_to_error_messages("Unauthorized User")}, 403

    comments = [ comment.to_dict() for comment in post_by_id.comments]
    return jsonify(comments), 200



# Create Comment based on Post Id
@post_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def create_comment(id):
    """
        Create Comment on Post for logged in user
    """
    form = CommentForm()
    # Get csrf_token from the request cookie
    # form mannually to validat_on_submit
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment (
            user_id = current_user.id,
            post_id = id,
            comment = form.data['comment'],
            # image = form.data['image']
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Edit Comment
@post_routes.route('/<int:post_id>/comments/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(post_id, comment_id):
    """
        Edit a Comment based on post
    """
    comment_by_id = Comment.query.get(comment_id)

    if not comment_by_id:
        return {'errors': validation_errors_to_error_messages("Post Not Found")}, 404

    if comment_by_id.user_id != current_user.id:
        return {'errors': validation_errors_to_error_messages("Unauthroized to Edit")}, 403

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit:
        comment_by_id.comment = form.comment.data
        comment_by_id.comment = form.comment.data

        db.session.commit()
        return comment_by_id.to_dict(), 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Delete Comment
@post_routes.route('/<int:post_id>/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(post_id, comment_id):
    """
        Delete a comment based on post
    """
    comment_to_delete = Comment.query.get(comment_id)

    if not comment_to_delete:
        return {'errors': validation_errors_to_error_messages("Post Not Found")}, 404

    if comment_to_delete.user_id != current_user.id:
        return {'errors': validation_errors_to_error_messages("Unauthroized to Edit")}, 403

    db.session.delete(comment_to_delete)
    db.session.commit()
    return {'message': "Successfully deleted the post"}, 200
