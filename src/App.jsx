import { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/userContext";
import ProductsPage from "./pages/ProductsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";

function App() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({});
  const { token, name } = loginData;
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    //navega direto para a rota /produtos caso tenha uma config previa no localStorage
    if (localStorage.getItem('config')){
        navigate('/produtos');
    };
    /*redefine novamente as keys no localStorage caso o loginData já tenha sido "setado" na rota /
    para não permitir que os valores no localStorage sejam redefinidos para undefined*/
    if (Object.keys(loginData).length > 0) {
        localStorage.setItem('config', JSON.stringify(config));
        localStorage.setItem('name', name);
    };
  }, [loginData]);

  const storedConfig = useRef(JSON.parse(localStorage.getItem('config')));
  const storedName = useRef(localStorage.getItem('name'));

  return (
    <UserContext.Provider value={{ 
      setLoginData,
      config: !storedConfig.current ? config : storedConfig.current,
      name: !storedName.current ? name : storedName.current
    }}>
      <Routes>
        <Route path="/" element={ <SignInPage/> }/>
        <Route path="/cadastro" element={ <SignUpPage/> }/>
        <Route path="/produtos" element={ <ProductsPage/> }/>
        <Route path="/carrinho" element={ <CartPage/> }/>
      </Routes>
    </UserContext.Provider>
  );
}

export default App
