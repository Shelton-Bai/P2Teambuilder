FROM openjdk:17.0.1
ARG JAR_FILE=./*.jar
COPY ./target/p2API-0.0.1-SNAPSHOT.jar api.jar
ENTRYPOINT [ "java","-jar","/api.jar" ]