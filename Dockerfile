## Bombaz docker file
FROM ubuntu:latest
MAINTAINER Sullivan M <sullivan.matas@gmail.com>

# update+ upgrade system packages
RUN apt-get update; apt-get upgrade
