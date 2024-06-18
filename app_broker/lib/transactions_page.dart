import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';

class TransactionsPage extends StatefulWidget {
  @override
  _TransactionsPageState createState() => _TransactionsPageState();
}

class _TransactionsPageState extends State<TransactionsPage> {
  @override
  List<dynamic> _orders = [];
  final String _baseUrl = 'http://ec2-15-228-190-59.sa-east-1.compute.amazonaws.com:8080/';

  late Timer _timer;

  get http => null;
  @override
  void initState() {
    // super.initState();
    _startTimer();
  }

  @override
  void dispose() {
    _timer?.cancel();
    // super.dispose();
  }

  void _startTimer() {
    _timer = Timer.periodic(Duration(seconds: 5), (timer) {
      _fetchData();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Transações'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: ListView.builder(
          itemCount: _orders.length,
          itemBuilder: (context, index) {
            var order = _orders[index];
            return ListTile(
              title: Text('Ativo: ${order['ativo']}'),
              subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Valor venda: R\$ ${order['real']}', style: TextStyle(color: Colors.red)),
                    Text('Valor Compra: R\$ ${order['real']}', style: TextStyle(color: Colors.green)),
                  ]
              ),
              trailing: Text('Quantidade: ${order['quant']}'),
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
