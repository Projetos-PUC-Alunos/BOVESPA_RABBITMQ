package com.fila.lab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
public class Broker {
    public static void main(String[] args) {
        SpringApplication.run(Broker.class, args);
    }
}

