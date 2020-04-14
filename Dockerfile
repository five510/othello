FROM python:3.7

MAINTAINER  goto_c@worksap.co.jp

ENV LANG C.UTF-8

WORKDIR /othello-application 

#Install docker client
RUN apt-get update
RUN apt-get -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN apt-key fingerprint 0EBFCD88
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
RUN apt-get update
RUN apt-get -y install docker-ce docker-ce-cli containerd.io

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./othello .
RUN python setup.py install

CMD ["python", "app.py"]