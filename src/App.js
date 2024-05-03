import './App.css';
import { useForm } from 'react-hook-form';
import { acoes } from "./types/";
import Moment from 'moment';
import { apiBroker, apiConsumer } from './services/api';
import { useEffect, useState } from 'react';

function App() {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConsumer.get("/transacoes");
        setTransacoes(response.data);
      } catch (error) {
        console.error("Erro ao processar solicitação:", error);
      }
    };
  
    fetchData();
  }, [transacoes]);


  const { register, handleSubmit } = useForm({});

  const handleSolicitation = async (formData) => {
    const data = {
      quant: formData.quantAcoes,
      real: Number(formData.valor),
      ativo: formData.acao
    };
  
    try {
      if (formData.tipoEvento === "compra") {
        await apiBroker.post("/compra", data);
      } else if (formData.tipoEvento === "venda") {
        const reponse = await apiBroker.post("/venda", data);

        console.log("Venda realizada com sucesso!", reponse);
      }
    } catch (error) {
      console.error("Erro ao processar solicitação:", error);
    }
  };
  


  return (
    <div class="container-fluid bg-dark">
      <div>
        <p class="fs-1 text-white text-center">Homebroker</p>
      </div>
        <div class="row row-cols-2 gy-5 justify-content-around">
            <div class="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 bg-light p-4">
                <h6>Compra e Venda de Ativos</h6>
                <form onSubmit={handleSubmit(handleSolicitation)}>
                    <div class="mb-3">
                      <label class="form-label">Titulo Ação</label>
                      <select className="form-select" aria-label="Default select example" {...register('acao')} required>
                        {acoes.map((index) => (
                          <option key={index} value={index} selected>{index}</option>
                        ))}
                      </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Quantidade</label>
                        <input type="number" class="form-control" {...register('quantAcoes')} min="1" required/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Valor</label>
                        <div class="input-group mb-2">
                          <div class="input-group-prepend">
                            <div class="input-group-text">R$</div>
                          </div>
                          <input type="number" class="form-control" {...register('valor')} min="0.01" step="0.01" required/>
                        </div>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="compra"
                        required
                        {...register('tipoEvento', { required: true })}
                      />
                      <label className="form-check-label">Compra</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="venda"
                        {...register('tipoEvento', { required: true })}
                      />
                      <label className="form-check-label">Venda</label>
                    </div>
                    <button type="submit" class="btn btn-primary float-end mt-2 d-block">Solicitar</button>
                </form>
            </div>
            <div class="col-8 bg-light ms-1">
                <h5>Transações</h5>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ativo</th>
                        <th scope="col">Corretora</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transacoes?.map((row, index) => (
                      <tr key={index}>
                        <td>{row.index}</td>
                        <td>{row.solicitacaoCompra ? row.solicitacaoCompra.ativo : ""}</td>
                        <td>{row.solicitacaoCompra ? row.solicitacaoCompra.corretora : ""}</td>
                        <td>{row.solicitacaoCompra ? row.solicitacaoCompra.real : ""}</td>
                        <td>{row.solicitacaoCompra ? row.solicitacaoCompra.quant : ""}</td>
                        <td>{Moment(row.dataTransacao).format('DD/MM/YYYY H:m:s')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <div class="col bg-light">Column</div>
            <div class="col bg-light">Column</div>
          </div>
    </div>
  );
}

export default App;
