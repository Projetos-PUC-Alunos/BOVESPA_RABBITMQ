package com.consumer.bolsa.services;

import com.consumer.bolsa.models.Message;
import com.consumer.bolsa.models.Transacao;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import com.consumer.bolsa.Repositories.SolicitacoesRepository;
import com.consumer.bolsa.Repositories.TransacaoRepository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class SolicitacaoService {
    public SolicitacaoService() {
    }

    public void adicionarMensagem(String topico, Message solicitacao) {
        SolicitacoesRepository.salvarSolicitacao(solicitacao, topico+".json");
    }

    public static List<Message> obterMensagens(String topico) {
        return SolicitacoesRepository.getMessages(topico+".json");
    }

    public void adicionarMensagens(String topico, List<Message> mensagens) throws IOException {
        SolicitacoesRepository.salvarMessages(mensagens, topico+".json");
    }

    public void imprimirRegistros() {
        System.out.println("---------------------------------");
    }


}
