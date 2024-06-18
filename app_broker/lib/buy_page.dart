import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class BuyPage extends StatefulWidget {
  @override
  _BuyPageState createState() => _BuyPageState();
}

class _BuyPageState extends State<BuyPage> {
  final List<String> _ativos = [
    "ABEV3",
    "PETR4",
    "VALE5",
    "ITUB4",
    "BBDC4",
    "BBAS3",
    "CIEL3",
    "PETR3",
    "HYPE3",
    "VALE3",
    "BBSE3",
    "CTIP3",
    "GGBR4",
    "FIBR3",
    "RADL3"
  ];

  String? _selectedAtivo;

  final String _baseUrl = 'http://ec2-15-228-190-59.sa-east-1.compute.amazonaws.com:8080/';
  final String _baseUrlPost = 'http://ec2-15-228-187-10.sa-east-1.compute.amazonaws.com:8080/';

  List<dynamic> _buys = [];

  final TextEditingController _quantityController = TextEditingController();
  final TextEditingController _realController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Comprar Ações'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            DropdownButtonFormField<String>(
              decoration: InputDecoration(labelText: 'Selecione o ativo'),
              value: _selectedAtivo,
              onChanged: (newValue) {
                setState(() {
                  _selectedAtivo = newValue;
                });
                _fetchData(newValue!);
              },
              items: _ativos.map((ativo) {
                return DropdownMenuItem(
                  value: ativo,
                  child: Text(ativo),
                );
              }).toList(),
            ),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _quantityController,
                    decoration: InputDecoration(labelText: 'Quantidade'),
                    keyboardType: TextInputType.number,
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: TextField(
                    controller: _realController,
                    decoration: InputDecoration(labelText: 'Valor'),
                    keyboardType: TextInputType.number,
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _sendData,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF8F51ED),
                ),
                child: Text(
                  'COMPRAR',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            SizedBox(height: 16),
            Text('Solicitações de venda'),
            Expanded(
              child: ListView.builder(
                itemCount: _buys.length,
                itemBuilder: (context, index) {
                  var buy = _buys[index];
                  return ListTile(
                    title: Text('Ativo: ${buy['ativo']}'),
                    subtitle: Text('R\$ ${buy['valor']}'),
                    trailing: Text('Quantidade: ${buy['quant']}'),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _fetchData(String value) async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/venda'),
        headers: {
          'ativo': value,
        },
      );

      if (response.statusCode == 200) {
        setState(() {
          _buys = jsonDecode(response.body);
        });
      } else {
        _showSnackbar('Houve um erro ao carregar as solicitações de venda.');
        setState(() {
          _buys = [];
        });
      }
    } catch (e) {
      _showSnackbar('Houve um erro ao carregar as solicitações de venda.');
      setState(() {
        _buys = [];
      });
    }
  }

  void _sendData() async {
    final String quant = _quantityController.text;
    final String real = _realController.text;
    final String? selectedValue = _selectedAtivo;

    try {
      final response = await http.post(
        Uri.parse('$_baseUrlPost/compra'),
        headers: {
          'Content-Type': 'application/json',
          // 'Custom-Header': selectedValue ?? '',
        },
        body: jsonEncode({
          'ativo': selectedValue,
          'quant': quant,
          'real': real,
        }),
      );

      if (response.statusCode == 201) {
        _showSnackbar('Enviado com sucesso!');
        _fetchData(selectedValue!);
      } else {
        _showSnackbar('Houve um erro ao enviar a ordem.');
        _fetchData(selectedValue!);
      }
    } catch (e) {
      _showSnackbar('Houve um erro ao enviar a ordem.');
      _fetchData(selectedValue!);
    }
  }

  void _showSnackbar(String message) {
    final snackBar = SnackBar(content: Text(message));
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
