import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:developer';
import 'dart:async';
import 'package:http/http.dart' as http;

class TransactionsPage extends StatefulWidget {
  @override
  _TransactionsPageState createState() => _TransactionsPageState();
}

class _TransactionsPageState extends State<TransactionsPage> {
  List<dynamic> _orders = [];
  final String _baseUrl = 'http://ec2-15-228-190-59.sa-east-1.compute.amazonaws.com:8080';

  late Timer _timer;

  @override
  void initState() {
    super.initState();
    _startTimer();
    _fetchData();
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 30), (timer) {
      _fetchData();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Transações'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView.builder(
          itemCount: _orders.length,
          itemBuilder: (context, index) {
            var order = _orders[index];
            return ListTile(
              title: Text('Ativo: ${order['solicitacaoVenda']['ativo']}'),
              subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Valor venda: R\$ ${order['solicitacaoVenda']['real']}', style: const TextStyle(color: Colors.red)),
                    Text('Valor Compra: R\$ ${order['solicitacaoCompra']['real']}', style: const TextStyle(color: Colors.green)),
                  ]
              ),
              trailing: Text('Quantidade: ${order['solicitacaoVenda']['quant']}'),
            );
          },
        ),
      ),
    );
  }

  void _fetchData() async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/transacoes'),
        // headers: {
        //   'ativo': value,
        // },
      );

      if (response.statusCode == 200) {
        log('orders: $_orders');
        setState(() {
          _orders = jsonDecode(response.body);

        });
      } else {
        _showSnackbar('Houve um erro ao carregar as transações.');
        setState(() {
          _orders = [];
        });
      }
    } catch (e) {
      log('error: ${e.toString()}');
      _showSnackbar('Houve um erro ao carregar as transações.');
      setState(() {
        _orders = [];
      });
    }
  }

  void _showSnackbar(String message) {
    final snackBar = SnackBar(content: Text(message));
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
