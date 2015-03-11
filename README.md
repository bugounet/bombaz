# bombaz
muiltiplayer online bomberman

Django powered website that offers access to an HTML5 powered multiplayer bomberman. This website acts like a gaming platform - managing gamers accounts, scores and offer a skin shop for fun.
-The game sources are provided through website file hosting however, the game in itself will be running web socket asynchrounous messaging or a separate running process.
-Load balancing will be managed by a simple wamp request from django appli to gaming server.

List of technologies used in this project :
- On backend side : Django, NGIX, gunicorn and crossbar.io (for websocket messaging on game server) 
- On frontend side : AngularJS, Grunt (for mimifying the code, and running unit tests), WebSockets (WAMP client)
- Database is provided by postresql

HOWTO install : 
# put the projet somewhere to make the venv work
put the project repository into /home/<you>/workspace/bombaz
# replace my user name by <you>
find ./virtualenv -type f -exec sed -i 's/smatas/<you>/g' {} \;
#Update your system
sudo apt-get update
sudo apt-get upgrade
# install dev libs so you can instal psycopg2
sudo apt-get install libpq-dev python3-dev
# install pgsql
sudo apt-get install  postgresql postgresql-contrib
# install nginx
sudo apt-get install nginx
# connect postgresql:
sudo su - postgresql
# in command line : create database
createdb bombazdb
# create user
createuser -P databaseuser
# connect to sql interpreter
psql
# grant all privileges on database you just created
GRANT ALL PRIVILEGES ON DATABASE bombazdb TO databaseuser;


