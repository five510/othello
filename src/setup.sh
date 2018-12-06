#apt update
#apt install -y mysql-server mysql-client
#apt-get install -y libmysqlclient-dev

yum install -y mysql
yum install -y python-devel mysql-deve
service mysqld start
chkconfig mysqld on

mysql -uroot <<EOF
CREATE DATABASE othello_db;
EOF

#install packages
pip-3.6 install bottle
pip-3.6 install mysqlclient

git clone https://github.com/five510/othello.git

cd othello
mysql -uroot othello_db < create_history_table.sql
mysql -uroot othello_db < create_user_table.sql