import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import ProductCard from "../components/Product";
import { ProductsContext } from "../contexts/productsContext";
import { UserContext } from "../contexts/userContext";
import { LoadingBody, NavigateButtons, ProductsPageBody, StyledResetSearch, StyledSearch } from "../style/ProductsPageBody";
const qtd = 6;

const ProductsPage = () => {

  const { config } = useContext(UserContext);
  const { setCartProducts } = useContext(ProductsContext);

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({});

  const searched = useRef(false);
  const getAllData = async () => {
    getProductsData();
    try{
      if (products.count === remainingProducts || !products.count){
        const cartData = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, config);
        setCartProducts(cartData.data);
      }
      searched.current = false;
      
    } catch ({response: {status, statusText, data}}){
      console.log(`${status} ${statusText}\n${data}`);
    }
  };
  
  const [pageCounter, setPageCounter] = useState(1);
  const [remainingProducts, setRemainingProducts] = useState(0);
  const changeRemainingProducts = (data) => {
    setRemainingProducts(previous => {
      if (data.count === 0){
        return data.count;
      } else if (data.count !== products.count){
        return data.count;
      } else if (previous === 0) { 
        return previous + data.count - qtd;
      } else {
        return previous;
      }
    });
  };
  const getProductsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${pageCounter}&qtd=${qtd}`);
      setProducts(data);
      changeRemainingProducts(data);
      window.scrollTo({ top: 0,behavior: 'smooth' });
      setLoading(false);
    } catch ({response: {status, statusText, data}}){
      setLoading(false);
      console.log(`${status} ${statusText}\n${data}`);
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const searchProducts = async (e, search, useEffect) => {
    if (e) e.preventDefault();
    if (!search) {
      setSearchInput("");

      setPageCounter(1);
      setRemainingProducts(products.count);
      getProductsData();
    } else {
      try {
        if (searchInput === "") return;
        setLoading(true);
        if (!useEffect) setPageCounter(1);
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?category=${searchInput}&page=${useEffect ? pageCounter : 1}&qtd=${qtd}`);
        if (data.count === 0) setPageCounter(1);
        setProducts(data);
        changeRemainingProducts(data);
        searched.current = true;
        setLoading(false);
  
      } catch ({response: {status, statusText, data}}){
        setLoading(false);
        Swal.fire({
          title: `<span style=";font-size: 18px">${status} ${statusText}\n${data}</span>`,
          width: 320,
          confirmButtonColor: '#5dbb63',
        });
      }
    }
  };

  useEffect(() => {
    if (searchInput !== "") {
      searchProducts(undefined, true, true);
    } else {
      setSearchInput("");
      getAllData();
    }
  }, [pageCounter]);

  const navigateBetween = (right) => {
    if (loading) return;
    setRemainingProducts(previous => previous + (right ? -qtd : qtd));
    setPageCounter(previous => previous + (right ? 1 : -1)); 
  };

  if (Object.keys(products).length === 0) return (
    <LoadingBody><p>Carregando...</p></LoadingBody>
  )
  return (  
    <ProductsPageBody>
      <form onSubmit={e => searchProducts(e, true, false)}>
        <input placeholder="Buscar produtos..."
          disabled={loading}
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        ></input>
        <button disabled={loading}><StyledSearch/></button>
        <button disabled={loading} type="button" onClick={() => 
          searchProducts(undefined, false, false)}
        ><StyledResetSearch/>
        </button>
      </form>
      {(Object.keys(products).length !== 0) 
        &&
        (<>
          {(products.productsData.length === 0 && searched.current) 
            ? 
            <h2>Não foi encontrado nenhum produto</h2>
            : 
            products.productsData.length === 0
            && <h2>Não há nenhum produto cadastrado</h2>
          }
          <ul>
              {products.productsData.map((product) => 
                <ProductCard product={product} key={product._id}/>)
              }
          </ul>
          <NavigateButtons loading={loading}>
            <>
              {pageCounter !== 1  
              && 
                <div onClick={() => navigateBetween(false)}>
                  <p>{loading ? '...' : '<'}<span>{pageCounter-1}</span></p>
                </div>
              }
              {remainingProducts - qtd > 0
              &&
                <div onClick={() => navigateBetween(true)}>
                  <p><span>{pageCounter+1}</span>{loading ? '...' : `>`}</p>
                </div>
              }
            </>
          </NavigateButtons>
        </>)
      }
    </ProductsPageBody>
  );
};

export default ProductsPage;