package com.fila.lab.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fila.lab.models.BodyDto;
import com.fila.lab.models.Message;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

@RestController
public class OrderMessages {
    private final String CORRETORA = "Corretora";

    @Autowired
    public OrderMessages() {
    }

    @PostMapping("/compra")
    public ResponseEntity<Object> enviarMensagemCompra(@RequestBody BodyDto body) {
        try {
            String topico = "compra." + body.getAtivo();
            Message message = Message.builder()
                    .quant(body.getQuant())
                    .corretora(CORRETORA)
                    .real(body.getReal()).build();

            enviarMensagemParaTopico(topico, message);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/venda")
    public ResponseEntity<Object> enviarMensagemVenda(@RequestBody BodyDto body) {
        try {
            String topico = "venda." + body.getAtivo();
            Message message = Message.builder()
                    .quant(body.getQuant())
                    .corretora(CORRETORA)
                    .real(body.getReal()).build();

            enviarMensagemParaTopico(topico, message);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void enviarMensagemParaTopico(String topico, Message message) throws IOException, TimeoutException {
        ConnectionFactory factory = getConnectionFactory();
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {

            channel.queueDeclare(topico, false, false, false, null);
            String jsonMessage = new ObjectMapper().writeValueAsString(message);
            channel.basicPublish("", topico, null, jsonMessage.getBytes(StandardCharsets.UTF_8));

            System.out.println(" [x] Sent '" + message + "'");
        }
    }

    private static ConnectionFactory getConnectionFactory() {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("bovespa-rabbitmq-gyqs.onrender.com");
        factory.setPort(5672);
        factory.setUsername("guest");
        factory.setPassword("guest");
        factory.setVirtualHost("/");
        return factory;
    }
}

