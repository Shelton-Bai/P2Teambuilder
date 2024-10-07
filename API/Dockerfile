FROM openjdk:17.0.1
ARG JAR_FILE=./*.jar
COPY ./restAPI.jar api.jar
ENTRYPOINT [ "java","-jar","/api.jar" ]