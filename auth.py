from flask import Blueprint

auth=Blueprint('auth', __name__)


@auth.route('/login')
def login():
    return "<p>login</p>"

@auth.route('/sign-up')
def sign_up():
    return "<p>sign up</p>"

@auth.route('/logout')
def log_out():
    return "<p>sign out</p>"