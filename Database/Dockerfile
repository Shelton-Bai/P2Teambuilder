FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=porygon2
ENV MYSQL_DATABASE=alldata
ENV MYSQL_AUTHENTICATION_PLUGIN=mysql_native_password

EXPOSE 3320

COPY init.sql /docker-entrypoint-initdb.d/
COPY my.cnf /etc/mysql/my.cnf