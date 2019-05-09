from datetime import datetime, timedelta
import jwt
from config.environment import secret
from app import db, ma, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
# from sqlalchemy.orm import backref
from marshmallow import validates_schema, ValidationError, fields, validate
# from .business import Business
from .base import BaseModel, BaseSchema

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=True, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, plaintext):
        self.password_hash = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self.password_hash, plaintext)

    def generate_token(self):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=1),
            'iat': datetime.utcnow(),
            'sub': self.id
        }

        token = jwt.encode(
            payload,
            secret,
            'HS256'
        ).decode('utf-8')

        return token


class UserSchema(ma.ModelSchema, BaseSchema):

    # @validates_schema
    # # pylint: disable=R0201
    # def chack_password_match(self, data):
    #     if data.get('password') != data.get('password_confirmation'):
    #         raise ValidationError(
    #         'Password do not match',
    #         'password_confirmation'
    #         )

    password = fields.String(
        required=True
        # validate=[validate.Length(min=8, max=50)]
    )

    business = fields.Nested('BusinessSchema', exclude=('user',))

    class Meta:
        model = User
        exclude = ('password_hash',)
        load_only = ('password', 'password_confirmation')
