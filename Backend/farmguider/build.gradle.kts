plugins {
	java
	id("org.springframework.boot") version "3.1.2"
	id("io.spring.dependency-management") version "1.1.2"
	id("org.flywaydb.flyway") version "9.20.1"
}

group = "pl.edu.uwm"
version = "0.1"

java {
	sourceCompatibility = JavaVersion.VERSION_20
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.flywaydb:flyway-core:9.20.1")
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	runtimeOnly("org.postgresql:postgresql")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	implementation ("org.hibernate.validator:hibernate-validator:7.0.1.Final")
	implementation ("jakarta.validation:jakarta.validation-api:3.0.0")
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.1.0")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

flyway {
	url = "jdbc:postgresql://localhost:5432/farm-guider"
	user = "postgres"
	password = "qwerty"
}
