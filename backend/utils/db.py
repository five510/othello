import MySQLdb.cursors
import setting
import flask
import logging
import time

logging.basicConfig()
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def dbh():
    if hasattr(flask.g, 'db'):
        return flask.g.db

    flask.g.db = MySQLdb.connect(
        host=setting.Constants.MYSQL_HOST,
        port=setting.Constants.MYSQL_PORT,
        user=setting.Constants.MYSQL_USER,
        password=setting.Constants.MYSQL_PASS,
        db=setting.Constants.MYSQL_DBNAME,
        charset='utf8mb4',
        cursorclass=MySQLdb.cursors.DictCursor,
        autocommit=True,
    )
    cur = flask.g.db.cursor()
    cur.execute(
        "SET SESSION sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'")
    return flask.g.db

def select_mst_source_code_by_id(source_code_id: int) -> dict:
    try:
        conn = dbh()
        with conn.cursor() as c:
            sql = '''
                SELECT 
                    * 
                FROM
                    mst_source_code
                WHERE 
                    id = %s
                '''
            c.execute(sql,(str(source_code_id),))
            return c.fetchone()
    except MySQLdb.Error as err:
        logger.exception(err)
        return None 

def select_id_name_mst_source_code() -> list:
    try:
        conn = dbh()
        with conn.cursor() as c:
            sql = '''
                SELECT 
                    id,code_name
                FROM
                    mst_source_code
                '''
            c.execute(sql)
            return c.fetchall()
    except MySQLdb.Error as err:
        logger.exception(err)
        return None

def insert_mst_source_code(source_code: str,code_name: str) -> int:
    try:
        conn = dbh()
        now_datetime = time.strftime('%Y-%m-%d %H:%M:%S')
        with conn.cursor() as c:
            sql = '''
                INSERT INTO 
                    `mst_source_code`  
                    (`source_code`, `code_name`,`save_at`)
                VALUES 
                    (%s, %s, %s)
                '''
            c.execute(sql, (
                source_code,
                code_name,
                now_datetime,
            ))
            source_code_id = c.lastrowid
            conn.commit()
            return source_code_id
    except MySQLdb.Error as err:
        logger.exception(err)
        return None 
    
def insert_trn_battle_result(souce_code_id_1: int, souce_code_id_2: int) -> str:
    try:
        conn = dbh()
        now_datetime = time.strftime('%Y-%m-%d %H:%M:%S')
        with conn.cursor() as c:
            sql = '''
                INSERT INTO 
                    `trn_battle_result`  
                    (`start_at`, `souce_code_id_1`,`souce_code_id_2`)
                VALUES 
                    (%s, %s, %s)
                '''
            c.execute(sql, (
                now_datetime,
                str(souce_code_id_1),
                str(souce_code_id_2),
            ))
            battle_result_id = c.lastrowid
            conn.commit()
            return battle_result_id
    except MySQLdb.Error as err:
        logger.exception(err)
        return None 
    
def insert_trn_battle_snapshot(result_id: int,current_code_id: 
        int,current_board: dict) -> str:
    conn = dbh()
    now_datetime = time.strftime('%Y-%m-%d %H:%M:%S')
    try:
        with conn.cursor() as c:
            sql = '''
                INSERT INTO 
                    `trn_battle_snapshot`  
                    (`save_at`, `result_id`,`current_code_id`,`current_board`)
                VALUES 
                    (%s, %s, %s, %s)
                '''
            c.execute(sql, (
                now_datetime,
                str(result_id),
                str(current_code_id),
                '"' + str(current_board) + '"'
            ))
            battle_snapshot_id = c.lastrowid
            conn.commit()
            return battle_snapshot_id
    except MySQLdb.Error as err:
        logger.exception(err)
        return None

def update_trn_battle_result(battle_result_id: int,win_user_id: int) -> str:
    conn = dbh()
    now_datetime = time.strftime('%Y-%m-%d %H:%M:%S')
    try:
        with conn.cursor() as c:
            sql = '''
                UPDATE 
                    `trn_battle_result`
                SET 
                    `win_source_code_id` = %s ,
                    `end_at` = %s
                WHERE 
                    id = %s
                '''
            c.execute(sql, (
                str(win_user_id),
                now_datetime,
                str(battle_result_id)
            ))
            battle_result_id = c.lastrowid
            conn.commit()
            return battle_result_id
    except MySQLdb.Error as err:
        logger.exception(err)
        return None
