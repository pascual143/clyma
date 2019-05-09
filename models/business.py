from app import db, ma
from marshmallow import fields
# from sqlalchemy.orm import backref
from .user import User
from .base import BaseModel, BaseSchema

class Business(db.Model, BaseModel):

    __tablename__ = 'businesses'

    name = db.Column(db.String(60), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(200), nullable=False)
    emmisions = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(200), nullable=False)
    energy = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='business')


class BusinessSchema(ma.ModelSchema, BaseSchema):

    products = fields.Nested('ProductSchema', many=True, exclude=('business',))
    # user = fields.Nested('UserSchema', only=('id', 'username'))

    class Meta:
        model = Business
