from flask import Blueprint
from flask import render_template
from flask import request, render_template, send_from_directory
# from watchlist_DB import add_ticker_to_user


from datetime import datetime

views=Blueprint('views', __name__)


def custom_template_renderer(folder_path, filename):
    # file_content=open(folder_path+filename, "r").read()
    file_content = open(folder_path + filename, "r", encoding="utf-8").read()
    return file_content

@views.route('/')
def home():
    return send_from_directory("static", "index.html") 


@views.route('/index.html')
def homepage():
    return send_from_directory("static", "index.html") #This is an alternative route for the index.html page


@views.route('/news.html')
def news():
    return send_from_directory("static", "news.html")


@views.route('/finRatios.html')
def financial_ratios():
    return send_from_directory("static", "finRatios.html")


@views.route('/crytpocurrencies.html')
def crypto_dashboard():
    return send_from_directory("static", "crytpocurrencies.html")

@views.route('/compound_interest.html')
def compound_interest():
    return send_from_directory("static", "compound_interest.html")


@views.route('/nse_categories.html')
def nse_categories():
    return send_from_directory("static", "nse_categories.html")


@views.route('/pegy_calculator.html')
def pegy_calculator():
    return send_from_directory("static", "pegy_calculator.html")


@views.route('/trade_entry.html')
def trade_entry():
    return send_from_directory("static", "trade_entry.html")


@views.route('/help.html')
def help():
    return send_from_directory("static", "help.html")



#scripts

@views.route('/auth.js')
def auth_js():
    return send_from_directory("static", "auth.js")


@views.route('/articles.html')
def articles():
    return send_from_directory("static", "articles.html")


@views.route('/education.html')
def education():
    return send_from_directory("static", "education.html")

@views.route('/copy_investing.html')
def copy_investing():
    return send_from_directory("static", "copy_investing.html")

