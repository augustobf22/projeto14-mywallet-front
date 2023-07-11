import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";

const viteURL = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const { user, setUser } = useContext(UserContext);
  const { user: userObj, token } = user;
  const [transactions, setTransactions] = useState([]);

  const url = `${viteURL}/home`;

  useEffect(() => {
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    const request = axios.get(url, config);

    request.then(r => {
      setTransactions(r.data);
    });
    request.catch(r => {
      alert(r.response.data);
    });
  }, []);

  
  const soma = 0;
  /*
  transactions.forEach(t => (
    if(t.tipo === "Entrada"){
      soma+=Number(t.value);
    } else {
      soma-=Number(t.value)
    };
  ))
  */

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {userObj.name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(t => (
            <ListItemContainer>
              <div>
                <span>t.time</span>
                <strong>t.description</strong>
              </div>
              <Value color={t.tipo==="Entrada" ? "positivo" : "negativo"}>t.value</Value>
            </ListItemContainer>
          )
          )}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={soma<0 ? "negativo" : "positivo"}>{soma}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <Link to="/nova-transacao/entrada">
            <p>Nova <br /> entrada</p>
          </Link>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <Link to="/nova-transacao/saida">
            <p>Nova <br />saída</p>
          </Link>
        </button> 
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`