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
  const [transactionOn, setTransactionOn] = useState(false);
  const [soma, setSoma] = useState(0);
  const navigate = useNavigate();

  const url = `${viteURL}/home`;

  useEffect(() => {
     if(user===undefined){
      alert("Faça o login!");
      navigate("/");
    };

    const config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    const request = axios.get(url, config);

    request.then(r => {
      setTransactions(r.data);
      if(r.data.length>0) setTransactionOn(true);

      let aux=0;
      r.data.forEach(t => (t.tipo===":entrada" ? aux+=Number(t.value) : aux-=Number(t.value)));
      setSoma(aux.toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2}));
    });

    request.catch(r => {
      alert(r.response.data);
    });
  }, []);

  function logout() {
     localStorage.removeItem("user");
     alert("Usuário deslogado!");
     navigate("/");
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {userObj !== undefined ? userObj.name : ""}</h1>
        <BiExit onClick={logout} data-test="logout"/>
      </Header>

      <Placheholder transactionOn={transactionOn}>
        Não há registros de entrada ou saída
      </Placheholder>

      <TransactionsContainer transactionOn={transactionOn}>
        <ul>
          {transactions.map(t => (
            <ListItemContainer key={t._id}>
              <div>
                <span>{t.time}</span>
                <strong data-test="registry-name">{t.description}</strong>
              </div>
              <Value data-test="registry-amount" color={t.tipo===":entrada" ? "positivo" : "negativo"}>{t.value.toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Value>
            </ListItemContainer>
          )
          )}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={soma<0 ? "negativo" : "positivo"} data-test="total-amount" >{soma}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <Link to="/nova-transacao/entrada">
            <p data-test="new-income">Nova <br /> entrada</p>
          </Link>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <Link to="/nova-transacao/saida">
            <p data-test="new-expense">Nova <br />saída</p>
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
  display: ${props => props.transactionOn ? "flex" : "none"};
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
const Placheholder = styled.div`
    display: ${props => props.transactionOn ? "none" : "flex" };
    flex-grow: 1;
    background-color: #fff;
    color: #868686;
    border-radius: 5px;
    padding: 16px;
    font-family: Raleway;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;

    justify-content: center;
    align-items: center;
`;

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