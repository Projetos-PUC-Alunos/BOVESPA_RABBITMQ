package com.consumer.bolsa.models;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonSerialize
@Getter
@Setter
public class Transacao implements Serializable {
    private Message solicitacaoVenda;
    private Message solicitacaoCompra;
    private String dataTransacao;

}
