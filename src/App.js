import './App.css';
import { useForm } from 'react-hook-form';
import { acoes } from "./types/"
import { apiBroker, apiConsumer } from './services/api';
import { useEffect, useState } from 'react';

function App() {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    const response = apiConsumer.get("/transacoes");
    console.log(response);
  }, []);


  const { register, handleSubmit } = useForm({});

  const handleSolicitation = async (formData) => {
    const data = {
      quant: formData.quantAcoes,
      real: Number(formData.valor),
      ativo: formData.acao
    };
  
    try {
      if (formData.tipoEvento === "compra") {
        const reponse = await apiBroker.post("/compra", data);
        console.log("Compra realizada com sucesso!", reponse);
      } else if (formData.tipoEvento === "venda") {
        const reponse = await apiBroker.post("/venda", data);

        console.log("Venda realizada com sucesso!", reponse);
      }
    } catch (error) {
      console.error("Erro ao processar solicitação:", error);
    }
  };
  


  return (
    <div class="container">
        <div class="row row-cols-2 g-4">
            <div class="col border bg-light">
                <form onSubmit={handleSubmit(handleSolicitation)}>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Titulo Ação</label>
                      <select className="form-select" aria-label="Default select example" {...register('acao')}>
                        {acoes.map((index) => (
                          <option key={index} value={index} selected>{index}</option>
                        ))}
                      </select>
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Quantidade</label>
                        <input type="number" class="form-control" id="exampleInputPassword1" {...register('quantAcoes')} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Valor</label>
                        <input type="text" class="form-control" id="exampleInputPassword1" {...register('valor')}/>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio1"
                        value="compra"
                        {...register('tipoEvento', { required: true })} // Registrar o campo 'tipoEvento' e adicionar validação (opcional)
                      />
                      <label className="form-check-label" htmlFor="inlineRadio1">Compra</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineRadio2"
                        value="venda"
                        {...register('tipoEvento', { required: true })} // Registrar o campo 'tipoEvento' e adicionar validação (opcional)
                      />
                      <label className="form-check-label" htmlFor="inlineRadio2">Venda</label>
                    </div>
                    <button type="submit" class="btn btn-primary d-block">solicitar</button>
                </form>
            </div>
            <div class="col border bg-light">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">solicitacaoVenda</th>
                        <th scope="col">solicitacaoCompra</th>
                        <th scope="col">dataTransacao</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col border bg-light">Column</div>
            <div class="col border bg-light">Column</div>
        </div>
    </div>
  );
}

export default App;
