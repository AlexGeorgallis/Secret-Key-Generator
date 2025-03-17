# Use an official Java runtime as a base image
FROM eclipse-temurin:17-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project into the container
COPY . /app

# Build the Spring Boot project
RUN ./mvnw clean package -DskipTests

# Expose the port Spring Boot will run on
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "target/secretkeygenerator-0.0.1-SNAPSHOT.jar"]
