from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password')
    # marnie = User(
    #     username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(
    #     username='bobbie', email='bobbie@aa.io', password='password')

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    # db.session.commit()
    # users = [
    #     {'first_name': 'Lionel', 'last_name': 'Messi', 'password': 'Messi10',
    #      'email': "messi@baca.com", 'education': 'La Masia de Can Planes',
    #      'education_icon': 'https://img.icons8.com/color/512/barcelona-fc.png',
    #      'profile_image': 'https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/10D00/production/_128046886_lionelmessi.jpg',
    #      'city': 'Barcelona', 'state': 'Catalonia', 'country': 'Spain'}
    # ]
    messi = User(
        first_name = 'Lionel', last_name = 'Messi', password = 'Messi10', email = 'messi10@baca.com', education = "La Masia de Can Planes",
        education_icon = 'https://img.icons8.com/color/512/barcelona-fc.png',
        profile_image = 'https://www.reuters.com/resizer/cWXR7AX_6kjEcZRGY0ughs1Hz7w=/1920x1920/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/TVO76CDW5VOCXOIYBW67B76BVY.jpg',
        city = 'Fun', state = 'Catalonia', country = 'Spain'
    )

    ronaldo = User(
        first_name = 'Cristiano', last_name = 'Ronaldo', password = 'Ronaldo7', email = 'ronaldo7@rmfc.com', education = "Sporting's Youth Academy",
        education_icon = 'https://www.designfootball.com/images/joomgallery/originals/football_crests_8/sporting_cp_20170529_1131302771.png',
        profile_image = 'https://i.insider.com/5b44e58065de782f008b4d96?width=1136&format=jpeg',
        city = 'Madrid', state = 'Madrid', country = 'Spain'
    )
    xavi = User(
        first_name = 'Xavi', last_name = 'Hernández', password = 'Xavixxx', email = 'xavix@baca.com', education = 'La Masia de Can Planes',
        education_icon = 'https://www.designfootball.com/images/joomgallery/originals/football_crests_8/sporting_cp_20170529_1131302771.png',
        profile_image = 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSlm70-v-AAaScCug9X1fJEVTgORl8UygPgozuves9JUUfLhTnQyE38fbcN0m2wi6D6MPo4Gg60F7YqrO4',
        city = 'Madrid', state = 'Madrid', country = 'Spain'
    )
    iniesta = User(
        first_name = 'Andres', last_name = 'Iniesta', password = 'Iniesta8', email = 'iniesta8@baca.com', education = 'La Masia de Can Planes',
        education_icon = 'https://img.icons8.com/color/512/barcelona-fc.png',
        profile_image = 'https://www.thefamouspeople.com/profiles/images/andrs-iniesta-7.jpg',
        city = 'Fun', state = 'Catalonia', country = 'Spain'
    )
    zidane = User(
        first_name = 'Zinedine', last_name = 'Zidane', password = 'Zizou10', email = 'zidane@rmfc.com', education = "AS Cannes",
        education_icon = 'https://upload.wikimedia.org/wikipedia/en/f/ff/AS_Cannes_logo.png',
        profile_image = 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRc8pgs3u3_54lhccpdACKWjwAFLtQNcRSqY4tGVkJObBZrr6kaMtPmzwmyhzhDlWnnG1OpLGcriOz5D6Q',
        city = 'Madrid', state = 'Madrid', country = 'Spain'
    )
    henry = User(
        first_name = 'Thierry', last_name = 'Henry', password = 'Henry14', email = 'henry14@arsenal.com', education = "AS Monaco",
        education_icon = 'https://en.wikipedia.org/wiki/AS_Monaco_FC#/media/File:LogoASMonacoFC2021.svg',
        profile_image = 'https://tmssl.akamaized.net/images/foto/galerie/thierry-henry-1417524348-3352.jpg',
        city = 'Fontvieille', state = 'Monaco', country = 'France'
    )

    db.session.add(messi)
    db.session.add(ronaldo)
    db.session.add(xavi)
    db.session.add(iniesta)
    db.session.add(zidane)
    db.session.add(henry)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
