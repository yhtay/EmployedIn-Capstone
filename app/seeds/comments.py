from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    all_comments = [
        {'post_id': 1, 'user_id': 2, 'comment': 'Congratulations on your big win! Well deserved!'},
        {'post_id': 1, 'user_id': 3, 'comment': 'Amazing achievement! So proud of you!'},
        {'post_id': 1, 'user_id': 4, 'comment': 'You are an inspiration to us all! Keep up the great work!'},
        {'post_id': 2, 'user_id': 4, 'comment': 'Good luck to your team! I hope they win!'},
        {'post_id': 2, 'user_id': 5, 'comment': 'I am rooting for your favorite team too! Let\'s hope they come out on top!'},
        {'post_id': 2, 'user_id': 6, 'comment': 'I love watching the Champions League final! Who do you think will win?'},
        {'post_id': 3, 'user_id': 1, 'comment': 'Ball control is so important! Keep up the hard work!'},
        {'post_id': 3, 'user_id': 2, 'comment': 'You\'ve got this! Keep practicing and you\'ll see improvement!'},
        {'post_id': 3, 'user_id': 3, 'comment': 'Good luck with the upcoming season! I know you\'ll do great!'},
        {'post_id': 4, 'user_id': 5, 'comment': 'Have fun at your next match! Go team!'},
        {'post_id': 4, 'user_id': 6, 'comment': 'You are such a talented player! I can\'t wait to see you in action!'},
        {'post_id': 4, 'user_id': 1, 'comment': 'Training is so important! Keep up the hard work!'},
        {'post_id': 5, 'user_id': 3, 'comment': 'Congrats on a great year! Celebrate with your team!'},
        {'post_id': 5, 'user_id': 4, 'comment': 'Great job! You worked hard and it paid off!'},
        {'post_id': 5, 'user_id': 5, 'comment': 'What an accomplishment! I hope you enjoy celebrating with your teammates!'},
        {'post_id': 6, 'user_id': 1, 'comment': 'Go team! I\'m cheering for your home country too!'},
        {'post_id': 6, 'user_id': 2, 'comment': 'The World Cup is always so exciting! Who are you rooting for?'},
        {'post_id': 6, 'user_id': 4, 'comment': 'I love watching the World Cup! Enjoy the game!'},
        {'post_id': 7, 'user_id': 3, 'comment': 'Congratulations on your big win! You and your team deserve it!'},
        {'post_id': 7, 'user_id': 5, 'comment': 'Way to go! Winning a tournament is such a great feeling!'},
        {'post_id': 7, 'user_id': 6, 'comment': 'I love playing soccer in tournaments! Congrats on your victory!'},
        {'post_id': 8, 'user_id': 2, 'comment': 'Pickup soccer is so much fun! Have a great game!'},
        {'post_id': 8, 'user_id': 4, 'comment': 'Playing soccer with friends is a great way to stay active and have fun! Enjoy your weekend game!'},
        {'post_id': 8, 'user_id': 6, 'comment': 'Pickup soccer is the best! Have a blast with your friends!'},
        {'post_id': 9, 'user_id': 1, 'comment': 'Cheering on your kids is the best feeling! Have fun at their game!'},
        {'post_id': 9, 'user_id': 2, 'comment': 'I bet your kid is an amazing soccer player! Have a great time at the game!'},
        {'post_id': 9, 'user_id': 5, 'comment': 'Watching your kid play sports is so much fun! Enjoy the game!'},
        {'post_id': 10, 'user_id': 3, 'comment': 'Volunteering as a coach is such a great way to give back! Keep up the amazing work!'},
        {'post_id': 10, 'user_id': 4, 'comment': 'I love that you\'re giving back to your community! Keep up the good work!'},
        {'post_id': 10, 'user_id': 6, 'comment': 'Coaching youth soccer is so rewarding! Keep inspiring those kids!'},
        {'post_id': 11, 'user_id': 1, 'comment': 'Learning new techniques is key to improving your game! Have fun practicing!'},
        {'post_id': 11, 'user_id': 3, 'comment': 'That sounds like a great clinic! I hope you learned a lot!'},
        {'post_id': 11, 'user_id': 5, 'comment': 'Improving your skills is so important! Good luck with your training!'},
        {'post_id': 12, 'user_id': 3, 'comment': 'Watching the game at the pub is always a good time! Have a beer for me!'},
        {'post_id': 12, 'user_id': 4, 'comment': 'I love watching sports with friends! Have a great time!'},
        {'post_id': 12, 'user_id': 6, 'comment': 'The pub is the perfect place to watch the game! Enjoy!'},
        {'post_id': 13, 'user_id': 2, 'comment': 'Playing for a good cause is amazing! Have fun and good luck!'},
        {'post_id': 13, 'user_id': 4, 'comment': 'Charity tournaments are so important! Have a great game and keep up the good work!'},
        {'post_id': 13, 'user_id': 6, 'comment': 'What a great way to use your skills for a good cause! Have fun playing!'},
        {'post_id': 14, 'user_id': 1, 'comment': 'The Women\'s World Cup is going to be amazing! Have fun and enjoy the games!'},
        {'post_id': 14, 'user_id': 3, 'comment': 'I wish I could go to the Women\'s World Cup! Have a great time!'},
        {'post_id': 14, 'user_id': 5, 'comment': 'What an incredible opportunity! I hope you have a blast at the Women\'s World Cup!'},
        {'post_id': 15, 'user_id': 2, 'comment': 'Joining a competitive league is a great way to challenge yourself! Good luck!'},
        {'post_id': 15, 'user_id': 1, 'comment': 'Joining a competitive league is a great way to improve your game! I wish you all the best!'},
        {'post_id': 15, 'user_id': 5, 'comment': 'Competitive leagues are so much fun! Good luck and have a great season!'}
    ]
    for comment in all_comments:
        new_comment = Comment(
            post_id=comment['post_id'],
            user_id=comment['user_id'],
            comment=comment['comment']
        )
        db.session.add(new_comment)
        db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
