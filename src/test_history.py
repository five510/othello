import app.models.processes.history as history

history_model = history.History()

first_user_id = 1
passive_user_id = 2
win_user_id = first_user_id

'{"first_user_id": "1","passive_user_id": "2","win_user_id": "1" }'
print(history_model.user_create(first_user_id,passive_user_id,win_user_id))