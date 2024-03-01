FROM node:21 AS ng-builder

RUN npm i -g @angular/cli

WORKDIR /ngapp

COPY client/package*.json .
COPY client/angular.json .
COPY client/tsconfig.* .
# COPY frontend/server.ts .
COPY client/src src

RUN npm ci && ng build
# /ngapp/dist/docker/browser

# start on this linux server
FROM maven:3-eclipse-temurin-21 AS sb-builder

WORKDIR /sbapp

COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn
COPY src src
COPY --from=ng-builder /ngapp/dist/client/browser/ /sbapp/src/main/resources/static

RUN mvn package -Dmaven.test.skip=true

FROM maven:3-eclipse-temurin-21
WORKDIR /app

COPY --from=sb-builder /sbapp/target/ecommerce-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080

EXPOSE ${PORT}

ENTRYPOINT SERVER_PORT=${PORT} java -jar ./app.jar