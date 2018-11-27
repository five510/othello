import app.models.services.db as db

class User:

    TABLE = [
        'id',
        'username',
        'mail',
        'ipaddress',
        'port',
        'urlpath'
    ]
    INSERT_USER_QUERY = 'INSERT INTO othelloUser (username, mail, ipaddress, port, urlpath) VALUES (%s, %s, %s, %s, %s)'
    UPDATE_USER_QUERY = ''
    SELECT_USER_QUERY = 'SELECT * FROM othelloUser'
    DELETE_USER_QUERY = 'DELETE FROM othelloUser where id = %s'

    def __init__(self):
        self.db_handler = db.DB_handle()
    
    def user_create(self, username, mail, ipaddress, port, urlpath):
        self.db_handler.execute(self.INSERT_USER_QUERY,(username, mail, ipaddress, port, urlpath))
        return None

    def update_user(self):
        pass

    def user_describe(self):
        self.db_handler.execute(self.SELECT_USER_QUERY)
        users = []
        for selected_user in self.db_handler.fetch_all():
            user = { self.TABLE[i]: selected_user[i] for i in range(len(self.TABLE)) }
            users.append(user)
        return {'users':users}

user_model = User()

