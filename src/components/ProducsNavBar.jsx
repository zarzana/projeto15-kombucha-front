import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ProductsContext } from "../contexts/productsContext";
import { UserContext } from "../contexts/userContext";
import { ProductsPageNavBar, StyledArrow, StyledCart } from "../style/ProductsPageBody";

const ProductsNavBar = () => {

  const navigate = useNavigate();

  const { name, config } = useContext(UserContext);
  const { cartProducts } = useContext(ProductsContext);

  const confirmSignOut = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/sign-out`, config);
      localStorage.removeItem('config');
      localStorage.removeItem('name');
      window.location.reload();
    } catch ({response: {status, statusText, data}}){
      Swal.fire({
        title: `<span style=";font-size: 18px">${status} ${statusText}\n${data}</span>`,
        width: 320,
        confirmButtonColor: '#5dbb63',
      });
    }
  }

  const signOut = () => {
    Swal.fire({
      title: '<span style=";font-size: 18px">Tem Certeza que deseja sair?</span>',
      width: 320,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#FF5C5C',
      denyButtonColor: 'lightgrey',
      }).then((result) => {
      if (result.isConfirmed) {
        confirmSignOut();
      }
    })
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