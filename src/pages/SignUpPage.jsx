import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignBody } from "../style/SignBody";

const SignUpPage = () => {

  const navigate = useNavigate();

  const [signUpInputs, setSignUpInputs] = useState(
    {name: "", email: "", password: ""}
  );
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async (e) => {
    e.preventDefault();

    if (confirmPassword !== signUpInputs.password) return alert("As senhas precisam ser iguais");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, signUpInputs);
      alert('Conta cadastrada com sucesso');
      navigate('/');
    } catch ({response: {status, statusText, data}}){
      alert(`${status} ${statusText}\n${data}`);
    }
  };

  return (  
    <SignBody>
      <form onSubmit={signUp}>
        <input type="text" placeholder="nome" required
          onChange={e => setSignUpInputs(previous => ({...previous, ['name']:e.target.value}))}
          value={signUpInputs.name}
        ></input>
        <input type="email" placeholder="email" required
          onChange={e => setSignUpInputs(previous => ({...previous, ['email']:e.target.value}))}
          value={signUpInputs.email}
        ></input>
        <input type="password" placeholder="senha" required
          onChange={e => setSignUpInputs(previous => ({...previous, ['password']:e.target.value}))}
          value={signUpInputs.password}
        ></input>
        <input type="password" placeholder="confirmar senha" required
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        ></input>
        <button>Cadastrar</button>
      </form>
      <p onClick={() => navigate('/')}>Já tem uma conta? Faça login!</p>
    </SignBody>
  );
};

export default SignUpPage;