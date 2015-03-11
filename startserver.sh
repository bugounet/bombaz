gunicorn --env DJANGO_SETTINGS_MODULE=project.settings.development project.wsgi:application --user=smatas --bind localhost:8001 -c /home/smatas/workspace/bombaz/virtualenv/gunicorn_config.py
