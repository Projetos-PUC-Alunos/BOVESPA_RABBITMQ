package com.consumer.bolsa.Repositories;

import com.consumer.bolsa.models.Message;
import com.consumer.bolsa.models.Transacao;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class SolicitacoesRepository {

    public SolicitacoesRepository() {
    }

    public static void salvarSolicitacao(Message message, String fileName) {
        try {
            List<Message> messages = getMessages(fileName);
            messages.add(message);
            salvarMessages(messages, fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static List<Message> getMessages(String fileName) {
        List<Message> messages = new ArrayList<>();
        try {
            File file = new File(fileName);
            if (!file.exists()) {
                file.createNewFile(); // Criar arquivo se não existir
            }
            if (file.length() == 0) {
                return messages; // Retornar lista vazia se o arquivo estiver vazio
            }
            ObjectMapper objectMapper = new ObjectMapper();
            messages = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Message.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return messages;
    }

    public static void salvarMessages(List<Message> messages, String fileName) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        objectMapper.writeValue(new File(fileName), messages);
    }


    public static void atualizarRegistros(List<Message> messages, String fileName) throws IOException {
        File file = new File(fileName);
        if (file.exists()) {
            file.delete();
        }
        salvarMessages(messages, fileName);
    }

}
