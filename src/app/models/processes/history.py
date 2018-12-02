import app.models.services.db as db
class History:

    TABLE = [
        'id',
        'firstUserId',
        'passiveUserId',
        'winUserId'
    ]
    INSERT_HISTORY_QUERY = 'INSERT INTO othelloHistory (firstUserId, passiveUserId, winUserId) VALUES (%s, %s, %s)'
    SELECT_HISTORY_QUERY = 'SELECT * FROM othelloHistory'
    def __init__(self):
        self.db_handler = db.DB_handle()
    
    def user_create(self,first_user_id,passive_user_id,win_user_id):
        self.db_handler.execute(self.INSERT_HISTORY_QUERY,(first_user_id,passive_user_id,win_user_id))
        return {}
    
    def history_describe(self):
        self.db_handler.execute(self.SELECT_HISTORY_QUERY)
        historys = []
        for selected_history in self.db_handler.fetch_all():
            history = { self.TABLE[i]: selected_history[i] for i in range(len(self.TABLE)) }
            historys.append(history)
        return {'history':historys}
        