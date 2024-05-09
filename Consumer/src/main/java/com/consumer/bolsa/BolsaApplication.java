package com.consumer.bolsa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeoutException;

import static com.consumer.bolsa.integrations.RabbitMq.consume;

@SpringBootApplication
@CrossOrigin
public class BolsaApplication {
    private static List<String> ativos = new ArrayList<>();

    public static void main(String[] args) throws IOException, TimeoutException {
        getAtivos();
        System.out.print("Olá mundão");
        for (String ativo : ativos) {
            processarAtivo(ativo);
        }

        SpringApplication.run(BolsaApplication.class, args);
    }

    private static void processarAtivo(String ativo) {
        try {
            consumir("venda." + ativo);
            consumir("compra." + ativo);
        } catch (IOException | TimeoutException e) {
            throw new RuntimeException(e);
        }
    }


    //Usando Thread para cada topico existente
    private static void consumir(String topico) throws IOException, TimeoutException {
        new Thread(() -> {
            try {
                consume(topico);
            } catch (IOException | TimeoutException e) {
                throw new RuntimeException(e);
            }
        }).start();
    }


    private static void getAtivos() {
        ativos.addAll(Arrays.asList(
                "ABEV3",
                "PETR4"
//                "VALE5",
//                "ITUB4",
//                "BBDC4",
//                "BBAS3",
//                "CIEL3",
//                "PETR3",
//                "HYPE3"
//                "VALE3",
//                "BBSE3", // DEBITO TECNICO AJUSTAR ERRO (connection error; protocol method: #method<connection.close>(reply-code=530, reply-text=NOT_ALLOWED - access to vhost 'angxpqak' refused for user 'angxpqak': connection limit (20) is reached)
//                "CTIP3",
//                "GGBR4",
//                "FIBR3",
//                "RADL3"
        ));
    }


}
