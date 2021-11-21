from db import db
from services.__internals__.models import PyrateBaseModel


class User(db.Model, PyrateBaseModel):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        name = '{first_name} {last_name} - ({email})'.format(
            first_name=self.first_name, last_name=self.last_name, email=self.email)
        return 'User: {name}'.format(name=name)
