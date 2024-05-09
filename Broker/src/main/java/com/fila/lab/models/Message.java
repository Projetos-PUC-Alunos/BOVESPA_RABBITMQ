package com.fila.lab.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@JsonSerialize
public class Message {
    private int quant;
    private double real;
    @Setter
    private String corretora;
}
