import app.models.services.db as db
class History:

    TABLE = [
        'id',
        'firstUserId',
        'passiveUserId',
        'winUserId'
    ]
    INSERT_HISTORY_QUERY = 'INSERT INTO othelloHistory (firstUserId, passiveUserId, winUserId) VALUES (%s, %s, %s)'
    
    def __init__(self):
        self.db_handler = db.DB_handle()
    
    def user_create(self,first_user_id,passive_user_id,win_user_id):
        self.db_handler.execute(self.INSERT_HISTORY_QUERY,(first_user_id,passive_user_id,win_user_id))
        return {}
    
    def history_describe(self):
        pass