#!/usr/bin/env python3
"""Defines a module that instantiates the Babel object"""


from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name)
babel = Babel(app)


class Config(object):
    """Has a LANGUAGES class attribute equal to ["en", "fr"]
    sets Babel’s default locale ("en") and timezone ("UTC")"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


@app.route('/')
def index():
    """
    simple flask app
    """
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(port="5000", host="0.0.0.0", debug=True)
