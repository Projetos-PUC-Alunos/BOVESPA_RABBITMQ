package com.consumer.bolsa.controller;

import com.consumer.bolsa.models.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.consumer.bolsa.services.SolicitacaoService.obterMensagens;

@RestController
public class SolicitacoesController {
    @GetMapping("/Solicitacoes/compra")
    public ResponseEntity<Object> solicitacoesCompras(@RequestHeader String ativo) {
        try {
            List<Message> solicitacoesVenda = obterMensagens("compra." + ativo);
            return new ResponseEntity<>(solicitacoesVenda, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/Solicitacoes/venda")
    public ResponseEntity<Object> solicitacoesVendas(@RequestHeader String ativo) {
        try {
            List<Message> solicitacoesVenda = obterMensagens("venda." + ativo);
            return new ResponseEntity<>(solicitacoesVenda, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}