## Bombaz docker file
FROM ubuntu:latest
MAINTAINER Sullivan Matas <sullivan.matas@gmail.com>

# update+ upgrade system packages
RUN apt-get update; apt-get upgrade


# add nginx conf and restart.
#rm /etc/nginx/sites-enabled/default
#ln -s /etc/nginx/sites-available/bombaz /etc/nginx/sites-enabled
#service nginx restart
