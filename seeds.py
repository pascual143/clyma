from app import app, db
from models.product import Product
from models.business import Business
from models.user import UserSchema

user_schema = UserSchema()


with app.app_context():
    db.drop_all()
    db.create_all()

    user1, errors = user_schema.load({
        'username': 'user1',
        'email': 'user1@email.com',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    db.session.add(user1)

    user2, errors = user_schema.load({
        'username': 'user2',
        'email': 'user2@email.com',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    db.session.add(user2)

    user3, errors = user_schema.load({
        'username': 'user3',
        'email': 'user3@email.com',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    db.session.add(user3)

    user4, errors = user_schema.load({
        'username': 'user4',
        'email': 'user4@email.com',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    db.session.add(user4)

    user5, errors = user_schema.load({
        'username': 'user5',
        'email': 'user5@email.com',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    db.session.add(user5)

    user6, errors = user_schema.load({
        'username': 'user6',
        'email': 'user6@email.com',
        'password': 'password',
        'password_confirmation': 'password'
    })

    if errors:
        raise Exception(errors)

    db.session.add(user6)

    cocacola = Business(
        id='1',
        user=user1,
        name='Coca-Cola Company',
        description='The Coca-Cola Company is an American corporation, and manufacturer, retailer, and marketer of nonalcoholic beverage concentrates and syrups.',
        image='http://www.coca-colamexico.com.mx/content/dam/journey/mx/es/private/historia/2017/agosto/Logo-Coca-Cola-Company.jpg',
        emmisions='5.52 millions metric tones',
        energy='52 millions megajules',
        category='Food and Beverage'
        )
    db.session.add(cocacola)


    apple = Business(
        id='2',
        user=user1,
        name='Apple Inc',
        description='Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.',
        image='https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201809210816',
        emmisions='0,9 metric tones',
        energy='28 millions megajules',
        category='Technology'
        )
    db.session.add(apple)

    nestle = Business(
        id='3',
        user=user1,
        name='Nestle',
        description='Nestle, the worlds largest food and beverage company, is committed to enhancing quality of life and contributing to a healthier future.',
        image='http://sirse.info/wp-content/uploads/2015/05/nestle541x311-800x500_c.jpg',
        emmisions='6.5 million metric tons ',
        energy='1.6 millions megajoules',
        category='Technology'
        )
    db.session.add(nestle)

    Business1 = Product(
        business=cocacola,
        id='1',
        user=user1,
        name='Coca-Cola Company',
        description='The Coca-Cola Company is an American corporation, and manufacturer, retailer, and marketer of nonalcoholic beverage concentrates and syrups.',
        image='http://www.coca-cola.co.uk/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg',
        emmisions='5.52 millions metric tones',
        energy='52 millions megajules',
        category='Food and Beverage'
        )
    db.session.add(Business1)

    Business2 = Product(
        business=apple,
        id='2',
        user=user1,
        name='Apple Inc',
        description='Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.',
        image='https://www.apple.com/ac/structured-data/images/open_graph_logo.png?201809210816',
        emmisions='0,9 metric tones',
        energy='28 millions megajules',
        category='Technology'
        )
    db.session.add(Business2)

    Business3 = Product(
        business=cocacola,
        id='3',
        user=user1,
        name='Coca-Cola Company',
        description='The Coca-Cola Company is an American corporation, and manufacturer, retailer, and marketer of nonalcoholic beverage concentrates and syrups.',
        image='http://www.coca-cola.co.uk/content/dam/journey/gb/en/hidden/Products/lead-brand-image/coca-cola-original-taste-gb-lead-598x336.jpg',
        emmisions='5.52 millions metric tones',
        energy='52 millions megajules',
        category='Food and Beverage'
        )
    db.session.add(Business3)



    db.session.commit()
