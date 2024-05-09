package com.consumer.bolsa.Repositories;

import com.consumer.bolsa.models.Transacao;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class TransacaoRepository {

    private static final String FILE_PATH = "transacoes.json";

    public static void salvarTransacao(Transacao transacao) {
        try {
            List<Transacao> transacoes = getTransacoes();
            transacoes.add(transacao);
            salvarTransacoes(transacoes);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static List<Transacao> getTransacoes() {
        List<Transacao> transacoes = new ArrayList<>();
        try {
            File file = new File(FILE_PATH);
            if (!file.exists()) {
                file.createNewFile(); // Criar arquivo se não existir
            }
            if (file.length() == 0) {
                return transacoes; // Retornar lista vazia se o arquivo estiver vazio
            }
            ObjectMapper objectMapper = new ObjectMapper();
            transacoes = objectMapper.readValue(file, objectMapper.getTypeFactory().constructCollectionType(List.class, Transacao.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return transacoes;
    }

    private static void salvarTransacoes(List<Transacao> transacoes) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        objectMapper.writeValue(new File(FILE_PATH), transacoes);
    }
}
