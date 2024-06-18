import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { SIZES, COLORS, FONTS, dummyData, icons } from "../constants";

import { MainLayout } from ".";

const Transacoes = () => {
  const [selectedAtivoTransacoes, setSelectedAtivoTransacoes] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valorVenda, setValorVenda] = useState("");
  const [valorCompra, setValorCompra] = useState("");

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Transações</Text>
        
        {/* Card Transações */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text
              style={{
                color: COLORS.white,
              }}
            >
              Ativo: {selectedAtivoTransacoes}
            </Text>
            <Text style={styles.cardRight}>Quantidade: {quantidade}</Text>
          </View>
          <Text
            style={{
              color: COLORS.white,
              marginTop: 15
            }}
          >
            Valor venda: <Text style={{color: COLORS.red}}>R$ {valorVenda}</Text>
          </Text>
          <Text
            style={{
              color: COLORS.white,
              marginTop: 15
            }}
          >
            Valor Compra: <Text style={{color: COLORS.lightGreen}}>R$ {valorCompra}</Text>
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
    marginBottom: 20
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

export default Transacoes;
