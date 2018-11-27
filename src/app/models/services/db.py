import MySQLdb
import configparser

class DB_handle:

    def __init__(self):
        self.config = configparser.ConfigParser()
        self.config.read('config/db.cnf')
        self.conn()

    def conn(self):
        self.connection = MySQLdb.connect(
            host = self.config.get('db', 'host'),
            user = self.config.get('db', 'user'),
            db = self.config.get('db', 'database'),
            charset = self.config.get('db', 'charset')
        )
        self.cursor = self.connection.cursor()
    
    def execute(self,sql,params=()):
        try:
            self.cursor.execute(sql,params)
        except MySQLdb.Error as e:
            print('MySQLdb.Error: ', e)
        finally:
            self.connection.commit()
    
    def fetch_all(self):
        return self.cursor.fetchall()
    
    def rowcount(self):
        return self.cursor.rowcount


 
'''
cursor.execute('SELECT * FROM sample')
# 件数の取得は Cusor オブジェクトの rowcount プロパティー
print(cursor.rowcount)  # 6
 
# 全件取得は cursor.fetchall()
print()
'''