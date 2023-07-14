import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/Product";
import { ProductsContext } from "../contexts/productsContext";
import { UserContext } from "../contexts/userContext";
import { ProductsPageBody, ProductsPageNavBar, StyledArrow, StyledCart, StyledResetSearch, StyledSearch } from "../style/ProductsPageBody";

const ProductsPage = () => {

  const navigate = useNavigate();

  const { name , config } = useContext(UserContext);
  const { cartProducts, setCartProducts } = useContext(ProductsContext);

  const [products, setProducts] = useState([]);

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

  const searched = useRef(false);
  const getProductsData = async () => {
    try{
      const productsData = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(productsData.data);
      const cartData = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, config);
      setCartProducts(cartData.data);
      
      searched.current = false;
      
    } catch ({response: {status, statusText, data}}){
      console.log(`${status} ${statusText}\n${data}`);
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const searchProducts = async (search) => {
    if (!search) return getProductsData();
    if (searchInput === "") return;
      
    try {
      const productsData = await axios.get(`${import.meta.env.VITE_API_URL}/products?category=${searchInput}`);
      setProducts(productsData.data);
      
      setSearchInput("");
      searched.current = true;

    } catch ({response: {status, statusText, data}}){
      alert(`${status} ${statusText}\n${data}`);
    }
  };

  useEffect(() => { getProductsData() }, []);

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
        <StyledCart onClick={() => navigate('/carrinho')}/>
      </ProductsPageNavBar>
      <form>
        <input placeholder="teste"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        ></input>
        <button type="button" onClick={() => searchProducts(true)}><StyledSearch/></button>
        <button type="button" onClick={() => searchProducts(false)}><StyledResetSearch/></button>
      </form>
      {(products.length === 0 && searched.current) 
        ? 
        <h2>Não há nenhum produto com essa categoria</h2>
        : 
        products.length === 0
        && <h2>Não há nenhum produto cadastrado</h2>
      }
      <ul>
          {products.map((product) => 
            <ProductCard product={product} key={product._id}/>)
          }
      </ul>
    </ProductsPageBody>
  );
};

export default ProductsPage;