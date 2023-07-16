import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/userContext";
import { SignBody } from "../style/SignBody";

const signInPage = () => {
  
  const navigate = useNavigate();

  const { setLoginData } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [signInInputs, setSignInInputs] = useState(
    {email: "", password: ""}
  );

  const signIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, signInInputs);
      setLoginData(data);
      navigate('/');
    } catch ({response: {status, statusText, data}}){
      setLoading(false);
      Swal.fire({
        title: `<span style=";font-size: 18px">${status} ${statusText}\n${data}</span>`,
        width: 320,
        confirmButtonColor: '#5dbb63',
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('config')) navigate('/');
  },[])

  return (  
    <SignBody>
      <form onSubmit={signIn}>
        <input type="email" placeholder="email" required
          disabled={loading}
          onChange={e => setSignInInputs(previous => ({...previous, ['email']:e.target.value}))}
          value={signInInputs.email}
        ></input>
        <input type="password" placeholder="senha" required
          disabled={loading}
          onChange={e => setSignInInputs(previous => ({...previous, ['password']:e.target.value}))}
          value={signInInputs.password}
        ></input>
        <button disabled={loading}
        >{!loading ? 'Entrar' : 'Carregando...'}
        </button>
      </form>
      <p onClick={() => navigate('/cadastro')}>Não tem uma conta? Cadastre-se!</p>
      <div onClick={() => navigate('/')}>Deseja antes disso continuar<br/>vendo os nossos produtos?</div>
    </SignBody>
  );
};

export default signInPage;