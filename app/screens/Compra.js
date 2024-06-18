import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { SIZES, COLORS, FONTS, dummyData, icons } from "../constants";

import { MainLayout } from ".";

const Compra = () => {
  const [selectedAtivo, setSelectedAtivo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");

  const ativos = [
    { label: "Ativo 1", value: "ativo1" },
    { label: "Ativo 2", value: "ativo2" },
    { label: "Ativo 3", value: "ativo3" },
    // Adicione mais ativos conforme necessário
  ];

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Comprar Ações</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedAtivo(value)}
          items={ativos}
          placeholder={{ label: "Selecione um ativo", value: null }}
          style={pickerSelectStyles}
        />

        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.inputWrapper1]}>
            <Text
              style={{
                color: COLORS.white,
                marginBottom: 5
              }}
            >
              Quantidade
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />
          </View>
          <View style={[styles.inputContainer, styles.inputWrapper2]}>
            <Text
              style={{
                color: COLORS.white,
                marginBottom: 5
              }}
            >
              Valor
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Valor"
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Comprar</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Solicitações de Venda</Text>
        

        {/* Card Solicitações Venda */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text
              style={{
                color: COLORS.white,
              }}
            >
              Ativo: {selectedAtivo}
            </Text>
            <Text style={styles.cardRight}>Quantidade: {quantidade}</Text>
          </View>
          <Text
            style={{
              color: COLORS.red,
              marginTop: 5
            }}
          >
            R$ {valor}
          </Text>
        </View>
      </View>
    </MainLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.black,
    paddingVertical: 70
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.white,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "white",
    
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
  },
  inputWrapper1: {
    marginRight: 5,
  },
  inputWrapper2: {
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
    color: COLORS.white,
  },
  card: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardRight: {
    alignSelf: "flex-end",
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.white, // Fundo preto para contraste
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: COLORS.black,
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold'
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: COLORS.white,
    paddingRight: 30, // Para espaço de ícone de seta em iOS
  },
  inputAndroid: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: COLORS.white,
    paddingRight: 30, // Para espaço de ícone de seta em Android
  },
});

export default Compra;
