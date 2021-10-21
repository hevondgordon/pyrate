from pyrate import app

from flask_sqlalchemy import SQLAlchemy

from decouple import config


conn_string = "postgresql://pyrate:Password1!@localhost:5432/pyrate"
app.config["SQLALCHEMY_DATABASE_URI"] = conn_string
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return "<User %r>" % self.username
