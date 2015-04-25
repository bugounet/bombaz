# bombaz

## multiplayer online bomberman

Django powered website that offers access to an HTML5 powered multiplayer bomberman. This website acts like a gaming platform - managing gamers accounts, scores and offer a skin shop for fun.
- The game sources are provided through website file hosting however, the game in itself will be running web socket asynchrounous messaging or a separate running process.
- Load balancing will be managed by a simple wamp request from django appli to gaming server.

## List of technologies used in this project :
- On backend side : Django, NGIX, gunicorn and crossbar.io (for websocket messaging on game server) 
- On frontend side : AngularJS, Grunt (for mimifying the code, and running unit tests), WebSockets (WAMP client)
- Database is provided by postresql

# HOWTO install : 

put the projet somewhere to make the venv work
for example put the project repository into /home/<you>/workspace/bombaz

Set a virtual env up
> ```virtualenv -p python3.4 --no-site-packages virtualenv```

Add environment variables used in our case : development settings module and so on...
> ```echo "export DJANGO_SETTINGS_MODULE=project.settings.development" >> virtualenv/bin/activate```

Remove SECRET_KEY variable from secret.py file.
> ```sed -i -e 's/SECRET_KEY.*//' /tmp/bombaz/project/settings/secret.py```

Generate a random secret key
> ```KEY=$(python3 scripts/secret_key_generator.py 50)```

Escape single quotes for python interpreter.
> ```KEY=$(echo $KEY | sed -e "s/'/\\\'/g");```

Use the key to append the result to template file.
> ```echo "SECRET_KEY='$KEY'" >> /tmp/bombaz/project/settings/secret.py```

Tell git to forget about the changes you made.
> ```git update-index --assume-unchanged project/settings/secret.py```

Update your system
> ```sudo apt-get update```

> ```sudo apt-get upgrade```

Install dev libs so you can instal psycopg2
> ```sudo apt-get install libpq-dev python3-dev```

Install pgsql
> ```sudo apt-get install  postgresql postgresql-contrib```

Install nginx
> ```sudo apt-get install nginx```

Install the nginx settings package for bombaz 
> ```sudo dpkg -i ./deb_package/bombaz-server-conf.deb```

Connect postgresql:
> ```sudo su - postgresql```

In command line : create database
> ```createdb bombazdb```

Create user
> ```createuser -P databaseuser```

Connect to sql interpreter
> ```psql```

Grant all privileges on database you just created
> ```GRANT ALL PRIVILEGES ON DATABASE bombazdb TO databaseuser;```

Activate virtual env
> ```. virtualenv/bin/activate```

Install dependencies
> ```pip install -r requirements.pip```

Go back to initial environment
> ```deactivate```

### Once in dev env, you can  get and "compile" JS dependencies.
For development purpose you can install javascript tools like less, bootstrap, grunt and so on.
To achieve this, you will first need to install the node package manager, and then the 
tools. Ubuntu's node package manager is a little bit old, so we'll use Chris Lea's PPA
repository.

Add Chris Lea's PP1
> ```sudo apt-add-repository ppa:chris-lea/node.js```

> ```sudo apt-get update```

Install the node js
> ```sudo apt-get install nodejs```

Install project's dependencies
> ```npm install```

Compile Bootstrap's sources.
> ```cd node_modules/bootstrap```

> ```npm install```

> ```grunt ```

> ```cd ../..```

Thanks for reading. Please, report any errors on this tutorial if you are stuck somewhere.

Sullivan

