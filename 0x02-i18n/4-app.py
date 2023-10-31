#!/usr/bin/env python3
"""Defines a get_locale function with the babel.localeselector decorator"""


from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name__)
app.url_map.strict_slashes = False
babel = Babel(app)


class Config(object):
    """Has a LANGUAGES class attribute equal to ["en", "fr"]
    sets Babel’s default locale ("en") and timezone ("UTC")"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """Uses request.accept_languages to determine
    the best match with our supported languages."""
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        print(locale)
        return locale

    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """
    simple flask app
    """
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run(port="5000", host="0.0.0.0", debug=True)
