import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/Product";
import { UserContext } from "../contexts/userContext";
import { ProductsPageBody, ProductsPageNavBar, StyledArrow, StyledCart } from "../style/ProductsPageBody";

const ProductsPage = () => {

  const navigate = useNavigate();

  const { name , config } = useContext(UserContext);

  //FAZER REQUISIÇÃO GET PARA PEGAR OS PRODUTOS DO CARRINHO
  const [cartProducts, setCartProducts] = useState([]);

  const signOut = async () => {
    if (!confirm('Tem certeza que deseja sair?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/sign-out`, config);
      localStorage.removeItem('config');
      localStorage.removeItem('name');
      window.location.reload();
    } catch ({response: {status, statusText, data}}){
      alert(`${status} ${statusText}\n${data}`);
    }
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(data);
      } catch ({response: {status, statusText, data}}){
        console.log(`${status} ${statusText}\n${data}`);
      }
    }
    fetchData();
  }, []);

  return (  
    <ProductsPageBody>
      <ProductsPageNavBar>
        <div>
          {!name 
            ?
            <>
              <p onClick={() => navigate('/cadastro')}>Cadastro</p>
              <p onClick={() => navigate('/entrar')}>Entrar</p>
            </>
            :
            <>
              <StyledArrow onClick={signOut}/>
              <span>{name}</span>
            </>
          }
        </div>
        <h1>{cartProducts.length}</h1>
        <StyledCart />
      </ProductsPageNavBar>
      <ul>
          {products.map((product) => 
            <ProductCard cartProducts={cartProducts} setCartProducts={setCartProducts} setProducts={setProducts} product={product} key={product._id}/>)
          }
      </ul>
    </ProductsPageBody>
  );
};

export default ProductsPage;