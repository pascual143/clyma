from flask import Blueprint, request, jsonify, g
from models.business import Business, BusinessSchema
from lib.secure_route import secure_route

business_schema = BusinessSchema()
businesses_schema = BusinessSchema(many=True)

api = Blueprint('businesses', __name__)

@api.route('/businesses', methods=['GET'])
def index():
    businesses = Business.query.all()
    return businesses_schema.jsonify(businesses)

@api.route('/businesses/<int:business_id>', methods=['GET'])
def show(business_id):
    business = Business.query.get(business_id)
    return business_schema.jsonify(business)

@api.route('/businesses', methods=['POST'])
@secure_route
def create():

    if g.current_user.business:
        return jsonify({'message': 'User already upload the business'}), 400

    business, errors = business_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    business.user = g.current_user

    business.save()

    return business_schema.jsonify(business)

@api.route('/businesses/<int:business_id>', methods=['PUT'])
@secure_route
def update(business_id):

    business = Business.query.get(business_id)

    if business.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401

    business, errors = business_schema.load(request.get_json(), instance=business)

    if errors:
        return jsonify(errors), 422

    business.save()

    return business_schema.jsonify(business)

@api.route('/businesses/<int:business_id>', methods=['DELETE'])
@secure_route
def delete(business_id):

    business = Business.query.get(business_id)

    if business.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401

    business.remove()

    return '', 204
