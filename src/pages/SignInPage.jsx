import styled from "styled-components"
import { Link, useNavigate} from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx"

const viteURL = import.meta.env.VITE_API_URL;

export default function SignInPage() {
  const navigate = useNavigate();

  const url = `${viteURL}/`;

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const {user, setUser} = useContext(UserContext);

  function submitForm(event) {
    event.preventDefault();

    const promise = axios.post(url, login);

    promise.then(r => {
      console.log(r.data);
      const {user, token} = r.data;
      setUser({user, token});

      localStorage.setItem("user", JSON.stringify({user, token}));

      navigate("/home");
    });
    promise.catch(r => {
      alert(r.response.data);
    });
  };

  return (
    <SingInContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input 
          data-test="email"
          required
          placeholder="E-mail" 
          type="email" 
          value={login.email}
          onChange={e => setLogin({
            email:e.target.value,
            password: login.password
          })}
        />
        <input 
          data-test="password"
          required
          placeholder="Senha" 
          type="password" 
          value={login.password}
          onChange={e => setLogin({
            email: login.email,
            password:e.target.value
          })}
        />
        <button type="submit" data-test="sign-in-submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
