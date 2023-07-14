import { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProductsContext } from "./contexts/productsContext";
import { UserContext } from "./contexts/userContext";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {

  const [cartProducts, setCartProducts] = useState([]);

  const [loginData, setLoginData] = useState({});
  const { token, name } = loginData;
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
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
    <ProductsContext.Provider value={{cartProducts, setCartProducts}}>
      <Routes>
        <Route path="/" element={ <ProductsPage/> }/>
        <Route path="/:id" element={ <ProductPage/> }/>
        <Route path="/entrar" element={ <SignInPage/> }/>
        <Route path="/cadastro" element={ <SignUpPage/> }/>
        <Route path="/carrinho" element={ <CartPage/> }/>
      </Routes>
    </ProductsContext.Provider>
    </UserContext.Provider>
  );
}

export default App
