# App Building phase --------
# OpenJDK 11 is currently most stable
FROM openjdk:11.0.16 AS build
LABEL authors="henrikmoewaehre"

RUN mkdir /server

WORKDIR /server

# Copy source code into container
COPY . .

# Build the application
RUN ./gradlew clean build

# Container setup --------
FROM openjdk:11.0.16-jre AS create-container

# Set the working directory in the container
WORKDIR /server

# Copy the built application from the previous stage
COPY --from=build /server .

# Command to run the application
CMD ["./gradlew", "run"]
#ENTRYPOINT ["top", "-b"]
