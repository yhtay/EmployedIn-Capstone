from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():
    all_posts = [
        {'user_id': 1, 'description': 'Just won the World Cup 2022, Thank you for all your Support', 'image': 'https://www.aljazeera.com/wp-content/uploads/2022/12/SSS10772_1.jpg'},
        {'user_id': 2, 'description': 'Watching the Champions League final and hoping my favorite team comes out on top!'},
        {'user_id': 3, 'description': 'Preparing for the upcoming season and working on my ball control skills'},
        {'user_id': 4, 'description': 'Training with my team and getting ready for our next match'},
        {'user_id': 5, 'description': 'Celebrating the end of the season with my teammates. What a great year it was!'},
        {'user_id': 6, 'description': 'Watching the World Cup and cheering on my home country! Go team!'},
        {'user_id': 1, 'description': 'Just got back from a soccer tournament and proud to say our team took home the trophy!'},
        {'user_id': 2, 'description': 'Playing pickup soccer with friends on the weekends is the perfect way to stay active and have fun!'},
        {'user_id': 3, 'description': 'Watching my kid\'s soccer game and cheering them on from the sidelines'},
        {'user_id': 4, 'description': 'Volunteering as a coach for a local youth soccer team. It\'s great to give back to the community!'},
        {'user_id': 5, 'description': 'Just got back from a soccer clinic where I learned some new techniques to improve my game!'},
        {'user_id': 2, 'description': 'Heading to the pub to watch the big game with some friends. Should be a good one!'},
        {'user_id': 1, 'description': 'Playing in a charity soccer tournament to raise money for a good cause. Let\'s go team!'},
        {'user_id': 4, 'description': 'Excited to be attending the Women\'s World Cup this year! Can\'t wait to see some of the world\'s best players in action!'},
        {'user_id': 3, 'description': 'Taking my soccer skills to the next level by joining a competitive league. Time to step up my game!'}
    ]
    for post in all_posts:
        if 'image' in post:
            new_post = Post(
                user_id=post['user_id'],
                description=post['description'],
                image=post['image'],
            )
        else:
            new_post = Post(
                user_id=post['user_id'],
                description=post['description'],
                image=None,
            )
        db.session.add(new_post)
        db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
