import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductsNavBar from "./components/ProducsNavBar";
import { ProductsContext } from "./contexts/productsContext";
import { UserContext } from "./contexts/userContext";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {

  const { pathname } = useLocation();

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
      {(pathname !== '/entrar' && pathname !== '/cadastro' && pathname !== '/carrinho') 
        && <ProductsNavBar />
      }
      <Routes>
        <Route path="/" element={ <ProductsPage/> }/>
        <Route path="/produto/:id" element={ <ProductPage/> }/>
        <Route path="/entrar" element={ <SignInPage/> }/>
        <Route path="/cadastro" element={ <SignUpPage/> }/>
        <Route path="/carrinho" element={ <CartPage/> }/>
        <Route path="/checkout" element={ <CheckoutPage/> }/>
      </Routes>
    </ProductsContext.Provider>
    </UserContext.Provider>
  );
}

export default App
