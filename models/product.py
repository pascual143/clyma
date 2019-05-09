from datetime import datetime
from app import db, ma
from marshmallow import fields
from .base import BaseModel, BaseSchema
from sqlalchemy.orm import backref

# pylint: disable=W0611


class Product(db.Model, BaseModel):

    __tablename__ = 'products'

    name = db.Column(db.String(60), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(200), nullable=False)
    emmisions = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(200), nullable=False)
    energy = db.Column(db.String(200), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='products')

    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    business = db.relationship('Business', backref='products')

class ProductSchema(ma.ModelSchema, BaseSchema):

    business = fields.Nested('BusinessSchema', exclude=('Products',))
    user = fields.Nested('UserSchema', only=('id', 'username'))


    class Meta:
        model = Product
