# FarmGuider

## Description
Engineering thesis - (backend) application for farm management

# Installation

## Prerequisites:

* <b>Java</b>: Ensure you have Java 20 installed. If not, download and install it from the official Oracle website or use a package manager if you're on Linux.

* <b>Gradle</b>: This project uses Gradle for dependency management and build automation. If you don't have Gradle installed, you can download it from the official Gradle website.
  <br> \* good to have, but not required

* <b>PostgreSQL</b>: The application uses it as its primary database. Make sure you have PostgreSQL installed and running. If not, download and install it from the official PostgreSQL website.
* <b>PostGIS</b>: The application uses the PostgreSQL database extension. Once you have installed PostgreSQL, launch the Stack Builder application and select your Postgres database, press "next" and in "Spatial Extensions" select PostGIS and go through the installation process.
* <b>Lombok</b>: This project uses Lombok to reduce boilerplate code. Ensure your IDE has the Lombok plugin installed.

### Setup

Clone the Repository:
* <b>git clone https://github.com/Primuu/EngineeringProject </b>
* <b>cd interns-reservations</b>

### Database Configuration:

* Create a PostgreSQL database named "<b>farm-guider</b>" and set the login credentials to it:
  <br>username: <b>postgres</b>
  <br>password: <b>qwerty</b>
<br> \* you can freely change the database login information in <b>application.yml</b> and <b>build.gradle.kts</b>

### Illustrative database schema

PLACEHOLDER

[//]: # (<div align="center">)

[//]: # (  <p>)

[//]: # (    <img align="center" src="" alt="database schema" />)

[//]: # (  </p>)

[//]: # (</div>)

### Dependency Installation:
Run the following command to download and install the required dependencies:
* <b>gradle build</b> (or if you don't have gradle: <b>./gradlew build</b>)

### Run Migrations:
Use Flyway to handle database migrations:

* <b>gradle flywayMigrate</b>

### Run the Application:
* <b>gradle bootRun</b>

## Features
* Open API documentation: <b>http://localhost:8080/swagger-ui/index.html </b>
<br> \* if application is running on default local port 8080
* Cookie based session
* JWT for secure data transmission
