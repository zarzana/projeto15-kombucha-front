import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Logo, SignBody } from "../style/SignBody";

const SignUpPage = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [signUpInputs, setSignUpInputs] = useState(
    {name: "", email: "", password: ""}
  );
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async (e) => {
    e.preventDefault();

    if (signUpInputs.confirmPassword !== signUpInputs.password) {
      return Swal.fire({
        title: `<span style=";font-size: 18px">As senhas precisam ser iguais!</span>`,
        width: 320,
        confirmButtonColor: '#5dbb63',
      });
    }
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, signUpInputs);
      Swal.fire({
        title: `<span style=";font-size: 18px">Conta cadastrada com sucesso!</span>`,
        width: 320,
        confirmButtonColor: '#5dbb63',
      });
      navigate('/entrar');
    } catch ({response: {status, statusText, data}}){
      setLoading(false);
      Swal.fire({
        title: `<span style=";font-size: 18px">${status} ${statusText}\n${data}</span>`,
        width: 320,
        confirmButtonColor: '#5dbb63',
      });
    }
  };

  return (  
    <SignBody>
      <Logo>Kombucha Shop</Logo>
      <form onSubmit={signUp}>
        <input type="text" placeholder="nome" required
          disabled={loading}
          onChange={e => setSignUpInputs(previous => ({...previous, ['name']:e.target.value}))}
          value={signUpInputs.name}
        ></input>
        <input type="email" placeholder="email" required
          disabled={loading}
          onChange={e => setSignUpInputs(previous => ({...previous, ['email']:e.target.value}))}
          value={signUpInputs.email}
        ></input>
        <input type="password" placeholder="senha" required
          disabled={loading}
          onChange={e => setSignUpInputs(previous => ({...previous, ['password']:e.target.value}))}
          value={signUpInputs.password}
        ></input>
        <input type="password" placeholder="confirmar senha" required
          disabled={loading}
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        ></input>
        <button disabled={loading}
          >{!loading ? 'Cadastrar' : 'Carregando...'}
        </button>
      </form>
      <p onClick={() => navigate('/entrar')}>Já tem uma conta? Faça login!</p>
      <div onClick={() => navigate('/')}>Deseja antes disso continuar<br/>vendo os nossos produtos?</div>
    </SignBody>
  );
};

export default SignUpPage;