package com.consumer.bolsa.models;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonSerialize
@Getter
public class Message {
    @Setter
    private int quant;
    private float real;
    private String corretora;
    private String ativo;

    public void setAtivo(String ativo) {
        this.ativo = ativo;
    }

    public static Message fromString(String message) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(message, Message.class);
        } catch (Exception e) {
            throw new RuntimeException(e);
            }
    }

    @Override
    public String toString() {
        return "Message{" +
                "quant=" + quant +
                ", real=" + real +
                ", ativo=" + ativo +
                ", corretora='" + corretora + '\'' +
                '}';
    }
}
