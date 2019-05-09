from flask import Blueprint, request, jsonify, g
from models.product import Product, ProductSchema
from lib.secure_route import secure_route

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

api = Blueprint('products', __name__)

@api.route('/products', methods=['GET'])
def index():
    products = Product.query.all()
    return products_schema.jsonify(products)

@api.route('/products/<int:product_id>', methods=['GET'])
def show(product_id):
    product = Product.query.get(product_id)
    return product_schema.jsonify(product)

@api.route('/products', methods=['POST'])
@secure_route
def create():

    product, errors = product_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    product.busineses = g.current_user.business

    if g.current_user.business is None:
        return jsonify({'message': 'You Need a Business to make Product'}), 400

    product.save()

    return product_schema.jsonify(product)


@api.route('/products/<int:product_id>', methods=['PUT'])
@secure_route
def update(product_id):

    product = Product.query.get(product_id)

    if product.business.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401

    product, errors = product_schema.load(request.get_json(), instance=product)

    if errors:
        return jsonify(errors), 422

    product.save()

    return product_schema.jsonify(product)

@api.route('/products/<int:product_id>', methods=['DELETE'])
@secure_route
def delete(product_id):

    product = Product.query.get(product_id)

    if product.business.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401

    product.remove()

    return '', 204
