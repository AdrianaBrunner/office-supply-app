package com.app;

import com.app.entities.SolicitacaoCompra;
import com.app.entities.StatusSolicitacaoCompra;
import com.app.repositories.SolicitacaoCompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class BackJavaSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackJavaSpringApplication.class, args);
    }

}
