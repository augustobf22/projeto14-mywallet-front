import styled from "styled-components"
import { Link, useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx"

const viteURL = import.meta.env.VITE_API_URL;

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    value: "",
    description: ""
  });

  const tipo = useParams().tipo;

  const {user, setUser} = useContext(UserContext);
  const {token} = user;

  const url = `${viteURL}/nova-transacao/:${tipo}`;

  function submitForm(event) {
    event.preventDefault();

    const config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

    const promise = axios.post(url, transaction, config);

    promise.then(r => {
      navigate("/home");
    });
    promise.catch(r => {
      alert(r.response.data);
    });
  };

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={submitForm}>
        <input 
          data-test="registry-amount-input"
          required
          placeholder="Valor" 
          type="text"
          value={transaction.value}
          onChange={e => setTransaction({
            value: e.target.value,
            description: transaction.description
          })}
        />
        <input 
          data-test="registry-name-input"
          required
          placeholder="Descrição" 
          type="text" 
          value={transaction.description}
          onChange={e => setTransaction({
            value: transaction.value,
            description: e.target.value
          })}
        />
        <button type="submit" data-test="registry-save">Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
