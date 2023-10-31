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


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """Defines function that returns a user dictionary
    or None if the ID cannot be found or if login_as was not passed"""
    login_id = request.args.get('login_as')
    if login_id:
        return users.get(int(login_id))
    return None


@app.before_request
def before_request() -> None:
    """Defines a before_request function that uses
    the app.before_request decorator to make it be executed before all other
    """
    user = get_user()
    g.user = user


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
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(port="5000", host="0.0.0.0", debug=True)
