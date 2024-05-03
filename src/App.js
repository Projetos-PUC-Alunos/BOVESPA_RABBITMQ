import './App.css';
import { useForm } from 'react-hook-form';
import { acoes } from "./types/"
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
            <div class="col-3 bg-light p-4">
                <form onSubmit={handleSubmit(handleSolicitation)}>
                    <div class="mb-3">
                      <label class="form-label">Titulo Ação</label>
                      <select className="form-select" aria-label="Default select example" {...register('acao')}>
                        {acoes.map((index) => (
                          <option key={index} value={index} selected>{index}</option>
                        ))}
                      </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Quantidade</label>
                        <input type="number" class="form-control" {...register('quantAcoes')} />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Valor</label>
                        <input type="text" class="form-control" {...register('valor')}/>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="compra"
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
                    <button type="submit" class="btn btn-primary float-end mt-2 d-block">solicitar</button>
                </form>
            </div>
            <div class="col-8 bg-light ms-1">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ativo</th>
                        <th scope="col">Corretora</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">dataTransacao</th>
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
                        <td>{row.dataTransacao}</td>
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
