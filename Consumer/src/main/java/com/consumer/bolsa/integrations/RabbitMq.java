package com.consumer.bolsa.integrations;

import com.consumer.bolsa.models.Message;
import com.consumer.bolsa.services.SolicitacaoService;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import com.consumer.bolsa.services.TransacaoService;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class RabbitMq {
    public static void consume(String topico) throws IOException, TimeoutException {
        ConnectionFactory factory = getConnectionFactory();
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        channel.queueDeclare(topico, false, false, false, null);

        SolicitacaoService livroOferta = new SolicitacaoService();

        // bloco que fica ouvindo os topicos, so sera executado quando houver uma mensagem
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String messageStr = new String(delivery.getBody(), StandardCharsets.UTF_8);

            String[] partes = topico.split("\\.");
            String ativo = partes[1];

            Message message = Message.fromString(messageStr);
            message.setAtivo(ativo);

            System.out.println(" [x] Received '" + messageStr + "'");

            processAndAddMessage(message, topico, livroOferta);
        };

        channel.basicConsume(topico, true, deliverCallback, consumerTag -> {
        });
    }

    private synchronized static void processAndAddMessage(Message message, String topico, SolicitacaoService livroOferta) {
        synchronized (livroOferta) {
            TransacaoService.processaTransacao(message, topico);
        }
    }


    private static ConnectionFactory getConnectionFactory() {
        ConnectionFactory factory = new ConnectionFactory();

        factory.setHost("jackal.rmq.cloudamqp.com");
        factory.setPort(5672);
        factory.setUsername("angxpqak");
        factory.setPassword("XrYoAMUvtZkGsqEcCf8dtboDcGX0aoYS");
        factory.setVirtualHost("angxpqak");

        return factory;
    }
}
