package com.cmpe275.TermProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class TermProjectApplication {

	public static void main(String[] args) {

		SpringApplication.run(TermProjectApplication.class, args);


	}

} 
