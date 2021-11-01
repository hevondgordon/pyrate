from db import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        data_dict = {}
        data = [{column.name: getattr(self, column.name)}
                for column in self.__table__.columns]
        for d in data:
            data_dict |= d
        return data_dict

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def __repr__(self):
        name = '{first_name} {last_name} - ({email})'.format(
            first_name=self.first_name, last_name=self.last_name, email=self.email)
        return 'User: {name}'.format(name=name)
