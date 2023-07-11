import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";
import { useState } from "react";

const viteURL = import.meta.env.VITE_API_URL;

export default function SignUpPage() {
  const navigate = useNavigate();

  const url = `${viteURL}/cadastro`;

  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [confirmPass, setConfirm] = useState("");

  function submitForm(event) {
    event.preventDefault();

    if(signUp.password!==confirmPass) {
      alert("As senhas não estão iguais!");
      return;
    };

    const promise = axios.post(url, signUp);

    promise.then(r => {
      navigate("/");
    });
    promise.catch(r => {
      alert(r.response.data);
    });
  };

  return (
    <SingUpContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
          data-test="name"
          required
          placeholder="Nome"
          type="text"
          value={signUp.name}
          onChange={e => setSignUp({
            name: e.target.value,
            email: signUp.email,
            password: signUp.password
          })}
        />
        <input 
          data-test="email"
          required 
          placeholder="E-mail" 
          type="email" 
          value={signUp.email}
          onChange={e => setSignUp({
            name: signUp.name,
            email: e.target.value,
            password: signUp.password
          })}
        />
        <input 
          data-test="password"
          required 
          placeholder="Senha" 
          type="password" 
          value={signUp.password}
          onChange={e => setSignUp({
            name:signUp.name,
            email: signUp.email,
            password: e.target.value
          })}
        />
        <input 
          data-test="conf-password"
          required 
          placeholder="Confirme a senha" 
          type="password" 
          value={confirmPass}
          onChange={e => setConfirm(e.target.value)}
        />
        <button type="submit" data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
