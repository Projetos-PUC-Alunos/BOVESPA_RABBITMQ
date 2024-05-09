package com.fila.lab.models;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@JsonSerialize
public class BodyDto {
    private int quant;
    private double real;
    private String ativo;
}
