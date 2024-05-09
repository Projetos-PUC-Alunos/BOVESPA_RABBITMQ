package com.consumer.bolsa.controller;

import com.consumer.bolsa.models.Transacao;
import com.consumer.bolsa.services.TransacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TransacaoController {
    @GetMapping("/transacoes")
    public ResponseEntity<Object> getTodasTransacoes() {
        try {
            List<Transacao> transacoes = TransacaoService.getTransacoes();
            return new ResponseEntity<>(transacoes, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}