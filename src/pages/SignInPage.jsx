import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { SignBody } from "../style/SignBody";

const signInPage = () => {
  
  const navigate = useNavigate();

  const { setLoginData } = useContext(UserContext);

  const [signInInputs, setSignInInputs] = useState(
    {email: "", password: ""}
  )

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, signInInputs);
      setLoginData(data);
      navigate('/produtos');
    } catch ({response: {status, statusText, data}}){
      alert(`${status} ${statusText}\n${data}`);
    }
  };

  return (  
    <SignBody>
      <form onSubmit={signIn}>
        <input type="email" placeholder="email" required
          onChange={e => setSignInInputs(previous => ({...previous, ['email']:e.target.value}))}
          value={signInInputs.email}
        ></input>
        <input type="password" placeholder="senha" required
          onChange={e => setSignInInputs(previous => ({...previous, ['password']:e.target.value}))}
          value={signInInputs.password}
        ></input>
        <button>Entrar</button>
      </form>
      <p onClick={() => navigate('/cadastro')}>Não tem uma conta? Cadastre-se!</p>
    </SignBody>
  );
};

export default signInPage;