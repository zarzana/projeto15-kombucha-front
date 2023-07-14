import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/Product";
import { ProductsContext } from "../contexts/productsContext";
import { UserContext } from "../contexts/userContext";
import { NavigateButtons, ProductsPageBody, StyledResetSearch, StyledSearch } from "../style/ProductsPageBody";
const qtd = 6;

const ProductsPage = () => {

  const navigate = useNavigate();

  const { config } = useContext(UserContext);
  const { setCartProducts } = useContext(ProductsContext);

  const { pathname } = useLocation();

  const [products, setProducts] = useState({});

  const searched = useRef(false);
  const getAllData = async () => {
    getProductsData();
    try{
      const cartData = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, config);
      setCartProducts(cartData.data);

      searched.current = false;
      
    } catch ({response: {status, statusText, data}}){
      console.log(`${status} ${statusText}\n${data}`);
    }
  };
  
  const topInputRef = useRef(null);
  const [pageCounter, setPageCounter] = useState(1);
  const getProductsData = async () => {
    topInputRef.current.scrollIntoView({ behavior: 'smooth' });
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${pageCounter}&qtd=${qtd}`);
      setProducts(data);
    } catch ({response: {status, statusText, data}}){
      alert(`${status} ${statusText}\n${data}`);
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const searchProducts = async (search) => {
    if (!search) {
      getProductsData(); 
      setSearchInput("");

      setPageCounter(1);
      navigate('/1');
    } else {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?category=${searchInput}&page=${pageCounter}&qtd=${qtd}`);

        setProducts(data);
        
        searched.current = true;
  
      } catch ({response: {status, statusText, data}}){
        alert(`${status} ${statusText}\n${data}`);
      }
    }
  };

  useEffect(() => {
    if (products.productsData?.length === 0) navigate(-1);
    if (pathname === '/' || Number(pathname.replace('/', '') + 1) < 1) navigate('/1');
    if (searchInput !== "") {
      searchProducts(true);
    } else {
      setSearchInput("");
      getAllData();
    }
  }, [pageCounter]);

  return (  
    <ProductsPageBody>
      <form>
        <input placeholder="teste"
          ref={topInputRef} 
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        ></input>
        <button type="button" onClick={() => searchProducts(true)}><StyledSearch/></button>
        <button type="button" onClick={() => searchProducts(false)}><StyledResetSearch/></button>
      </form>
      {(Object.keys(products).length !== 0) 
        &&
        (<>
          {(products.productsData.length === 0 && searched.current) 
            ? 
            <h2>Não há nenhum produto com essa categoria</h2>
            : 
            products.productsData.length === 0
            && <h2>Não há nenhum produto cadastrado</h2>
          }
          <ul>
              {products.productsData.map((product) => 
                <ProductCard product={product} key={product._id}/>)
              }
          </ul>
          <NavigateButtons>
              <>
                {pathname !== '/1'  
                && 
                  <div onClick={() => {
                    setPageCounter(previous => previous -1); navigate(-1); 
                  }}>
                    <p>{'<'}</p>
                  </div>
                }
                {products.productsData.length === qtd
                &&
                  <div onClick={() => {
                    setPageCounter(previous => previous + 1); navigate(`/${(pageCounter + 1)}`);
                  }}>
                    <p>{'>'}</p>
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