import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../contexts/productsContext";
import { UserContext } from "../contexts/userContext";
import { ProductsPageNavBar, StyledArrow, StyledCart } from "../style/ProductsPageBody";

const ProductsNavBar = () => {

  const navigate = useNavigate();

  const { name, config } = useContext(UserContext);
  const { cartProducts } = useContext(ProductsContext);

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

  return (
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
  );
};

export default ProductsNavBar;