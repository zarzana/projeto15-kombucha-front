import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../contexts/productsContext";
import { UserContext } from "../contexts/userContext";
import { addToCart } from "../functions/addToCart";
import { AddRmCart, StyledProductCard } from "../style/ProductsPageBody";

const ProductCard = ({ product }) => {
  const { _id, title, price, stock, imgUrl } = product;

  const navigate = useNavigate();

  const { config, name } = useContext(UserContext);
  const { cartProducts, setCartProducts } = useContext(ProductsContext);

  const [loading, setLoading] = useState(false);

  const isInCart = cartProducts.some(product => product._id === _id);

  return(
    <StyledProductCard cart={isInCart} stock={stock}>
      <div  onClick={() => navigate(`/produto/${_id}`, { state: { product } })} >
        {stock < 1 && <h2>Fora de estoque</h2>}
        <img src={imgUrl}></img>
      </div>
      <div>
        <p>{title}</p>
        <p>R${price.toFixed(2).replace('.', ',')}</p>
        <p><span>no estoque: {stock}</span></p>
        <button 
          disabled={loading}
          onClick={() => addToCart(import.meta.env.VITE_API_URL, name, config, _id, stock, isInCart, cartProducts, setCartProducts, setLoading)}
        >{loading ? <h3>Carregando...</h3> : (isInCart) ? <h3>Remover do Carrinho</h3> : <h3>Adicionar ao Carrinho</h3>}
          <AddRmCart />
        </button>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;