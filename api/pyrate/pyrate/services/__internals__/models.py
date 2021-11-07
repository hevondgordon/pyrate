class PyrateBaseModel:

    def to_dict(self):
        data_dict = {}
        data = [{column.name: getattr(self, column.name)}
                for column in self.__table__.columns]
        for d in data:
            data_dict |= d
        return data_dict
