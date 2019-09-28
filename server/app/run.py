#!/usr/bin/env python
import os
from flask import Flask, abort, request, jsonify, g, url_for
from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
from flask_login import (login_user,logout_user, LoginManager, UserMixin, current_user)
from server.app.config import auth, search_data
from server.app.dashboard import dashboard
from server.app.user import user
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
CORS(app, supports_credentials=True)

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    password_hash = db.Column(db.String(64))
    weights = db.Column(db.String(500))
    preferedName = db.Column(db.String(100))

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration=600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None    # valid token, but expired
        except BadSignature:
            return None    # invalid token
        user = User.query.get(data['id'])
        return user

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)  # python 3

@login_manager.user_loader
def user_loader(id):
    user = User.query.filter_by(id=id).first()
    return user

@app.before_request
def before_request():
    g.user = current_user

@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@app.route('/register', methods=['POST'])
def new_user():
    email = request.json.get('email')
    password = request.json.get('password')
    preferedName = request.json.get('preferedName')
    technicalSkill = request.json.get('technicalSkill')
    projectEngagement = request.json.get('projectEngagement')
    communicationSkill = request.json.get('communicationSkill')
    innovationProcentage = request.json.get('innovationProcentage')
    adaptability = request.json.get('adaptability')
    print(email, password, preferedName, technicalSkill, projectEngagement, communicationSkill, innovationProcentage, adaptability)
    if preferedName is None or password is None or email is None or technicalSkill is None or projectEngagement is None or communicationSkill is None or innovationProcentage is None or adaptability is None:
        abort(400)    # missing arguments
    if User.query.filter_by(username=email).first() is not None:
        abort(400)    # existing user
    user = User(username=email, preferedName=preferedName, weights=",".join(list(map(str, [technicalSkill, projectEngagement, communicationSkill, innovationProcentage, adaptability]))))
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return (jsonify({'username': user.username}), 201,
            {'Location': url_for('get_user', id=user.id, _external=True)})


@app.route('/api/users/<int:id>')
def get_user(id):
    user = User.query.get(id)
    if not user:
        abort(400)
    return jsonify({'username': user.username})

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)  # missing arguments
    user = User.query.filter_by(username=username).first()
    if not user or not user.verify_password(password):
        abort(400)  # existing user
    login_user(user, remember=True)
    token = user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600, 'weights': user.weights})


@app.route('/logout', methods=['GET','POST'])
# @auth.login_required
def logout():
    logout_user()
    return "logout page"

@app.route('/profile/change', methods=['POST'])
def change_user():
    email = request.json.get('email')
    technicalSkill = request.json.get('technicalSkill')
    projectEngagement = request.json.get('projectEngagement')
    communicationSkill = request.json.get('communicationSkill')
    innovationProcentage = request.json.get('innovationProcentage')
    adaptability = request.json.get('adaptability')
    if email is None:
        abort(400)    # missing arguments
    if User.query.filter_by(username=email).first() is None:
        abort(400)    # existing user
    user = User.query.filter_by(username=email).first()
    print(user.weights, user.username)
    user.weights = ",".join(list(map(str, [technicalSkill, projectEngagement, communicationSkill, innovationProcentage, adaptability])))
    db.session.commit()
    return (jsonify({'username': user.username}), 201,
            {'Location': url_for('get_user', id=user.id, _external=True)})

@app.route('/weights', methods=['POST'])
# @auth.login_required
def get_weights():
    if not request.json or 'email' not in request.json:
        abort(400)
    email = request.json.get('email')
    print(email)
    user = User.query.filter_by(username=email).first()
    if not user:
        abort(400)
    print({'weights': user.weights, 'preferedName': user.preferedName})
    return jsonify({'weights': user.weights, 'preferedName': user.preferedName})

@app.route('/search', methods=['POST'])
# @auth.login_required
def search():
    if not request.json or 'query' not in request.json:
        abort(400)
    query = request.json.get('query')
    if query not in search_data:
        return jsonify({"code":"", "description":"", "link":""})
    print(search_data[query])
    return jsonify(search_data[query])


@app.route('/api/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})


app.register_blueprint(dashboard, url_prefix='/dashboard')
app.register_blueprint(user, url_prefix='/user')


if __name__ == '__main__':
    if not os.path.exists('db.sqlite'):
        db.create_all()
    app.run('0.0.0.0', debug=True)
