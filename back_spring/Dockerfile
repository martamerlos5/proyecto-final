FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests


RUN cp target/back_spring-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "app.jar"]