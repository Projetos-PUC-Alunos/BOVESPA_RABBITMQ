package com.consumer.bolsa.services;

import com.consumer.bolsa.Repositories.SolicitacoesRepository;
import com.consumer.bolsa.Repositories.TransacaoRepository;
import com.consumer.bolsa.models.Message;
import com.consumer.bolsa.models.Transacao;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TransacaoService {

    public static List<Transacao> getTransacoes() {
        return TransacaoRepository.getTransacoes();
    }

    @SneakyThrows
    public static Message processaTransacao(Message solicitacao, String topico) {
        SolicitacoesRepository.salvarSolicitacao(solicitacao, topico+".json");

        String[] partes = topico.split("\\.");
        String acao = partes[0];
        String ativo = partes[1];

        boolean transacaoProcessada = false;

        if (acao.equals("venda")) {
            List<Message> solicitacoesCompra = SolicitacaoService.obterMensagens("compra." + ativo);
            List<Integer> indicesRemover = new ArrayList<>();

            for (int i = 0; i < solicitacoesCompra.size(); i++) {
                Message solicitacaoCompra = solicitacoesCompra.get(i);
                if (solicitacao.getReal() <= solicitacaoCompra.getReal()) {
                    if (solicitacao.getQuant() == solicitacaoCompra.getQuant()) {
                        indicesRemover.add(i);
                        transacaoProcessada = true;

                        salvaTransacao(Message.builder()
                                .corretora(solicitacaoCompra.getCorretora())
                                .quant(solicitacaoCompra.getQuant())
                                .real(solicitacao.getReal())
                                .ativo(solicitacaoCompra.getAtivo())
                                .build(), solicitacao);
                        break;
                    } else if (solicitacao.getQuant() < solicitacaoCompra.getQuant()) {

                        salvaTransacao(Message.builder()
                                .corretora(solicitacaoCompra.getCorretora())
                                .quant(solicitacao.getQuant())
                                .real(solicitacao.getReal())
                                .ativo(solicitacaoCompra.getAtivo())
                                .build(), solicitacao);

                        solicitacaoCompra.setQuant(solicitacaoCompra.getQuant() - solicitacao.getQuant());
                        transacaoProcessada = true;
                        break;
                    } else { // solicitacao.getQuant() > solicitacaoCompra.getQuant()
                        indicesRemover.add(i);
                        solicitacao.setQuant(solicitacao.getQuant() - solicitacaoCompra.getQuant());
                        salvaTransacao(solicitacaoCompra, Message.builder()
                                .corretora(solicitacao.getCorretora())
                                .quant(solicitacaoCompra.getQuant())
                                .ativo(solicitacao.getAtivo())
                                .real(solicitacao.getReal())
                                .build());
                    }
                }
            }

            // Remover elementos da lista
            for (int i = indicesRemover.size() - 1; i >= 0; i--) {
                solicitacoesCompra.remove((int) indicesRemover.get(i));
                SolicitacoesRepository.atualizarRegistros(solicitacoesCompra, topico+".json");
            }
        }

        if (acao.equals("compra")) {
            List<Message> solicitacoesVenda = SolicitacaoService.obterMensagens("venda." + ativo);
            List<Integer> indicesRemover = new ArrayList<>();

            for (int i = 0; i < solicitacoesVenda.size(); i++) {
                Message solicitacaoVenda = solicitacoesVenda.get(i);
                if (solicitacao.getReal() >= solicitacaoVenda.getReal()) {
                    if (solicitacao.getQuant() == solicitacaoVenda.getQuant()) {
                        indicesRemover.add(i);
                        transacaoProcessada = true;

                        salvaTransacao(Message.builder()
                                .corretora(solicitacao.getCorretora())
                                .quant(solicitacao.getQuant())
                                .real(solicitacaoVenda.getReal())
                                .ativo(solicitacao.getAtivo())
                                .build(), solicitacaoVenda);

                        break;
                    } else if (solicitacao.getQuant() < solicitacaoVenda.getQuant()) {

                        salvaTransacao(Message.builder()
                                .corretora(solicitacao.getCorretora())
                                .quant(solicitacao.getQuant())
                                .real(solicitacaoVenda.getReal())
                                .ativo(solicitacaoVenda.getAtivo())
                                .build(), Message.builder()
                                .corretora(solicitacaoVenda.getCorretora())
                                .quant(solicitacao.getQuant())
                                .real(solicitacaoVenda.getReal())
                                .ativo(solicitacao.getAtivo())
                                .build());

                        solicitacaoVenda.setQuant(solicitacaoVenda.getQuant() - solicitacao.getQuant());
                        transacaoProcessada = true;
                        break;
                    } else { // solicitacao.getQuant() > solicitacaoVenda.getQuant()
                        indicesRemover.add(i);
                        solicitacao.setQuant(solicitacao.getQuant() - solicitacaoVenda.getQuant());
                        salvaTransacao(Message.builder()
                                .corretora(solicitacao.getCorretora())
                                .quant(solicitacaoVenda.getQuant())
                                .real(solicitacaoVenda.getReal())
                                .ativo(solicitacao.getAtivo())
                                .build(), solicitacaoVenda);
                    }
                }
            }

            // Remover elementos da lista
            for (int i = indicesRemover.size() - 1; i >= 0; i--) {
                solicitacoesVenda.remove((int) indicesRemover.get(i));
                SolicitacoesRepository.atualizarRegistros(solicitacoesVenda, topico+".json");
            }
        }

        return transacaoProcessada ? null : solicitacao;
    }


    private static void salvaTransacao(Message compra, Message venda) {
        TransacaoRepository.salvarTransacao(Transacao.builder()
                .dataTransacao(LocalDateTime.now().toString())
                .solicitacaoCompra(compra)
                .solicitacaoVenda(venda)
                .build());
    }
}
