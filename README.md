# bombaz
muiltiplayer online bomberman

Django powered website that offers access to an HTML5 powered multiplayer bomberman. This website acts like a gaming platform - managing gamers accounts, scores and offer a skin shop for fun.
-The game sources are provided through website file hosting however, the game in itself will be running web socket asynchrounous messaging or a separate running process.
-Load balancing will be managed by a simple wamp request from django appli to gaming server.

List of technologies used in this project :
- On backend side : Django, NGIX, gunicorn and crossbar.io (for websocket messaging on game server) 
- On frontend side : AngularJS, Grunt (for mimifying the code, and running unit tests), WebSockets (WAMP client)
- Database is provided by postresql

