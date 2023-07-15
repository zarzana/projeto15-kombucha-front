import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductsContext } from "../contexts/productsContext";
import { UserContext } from "../contexts/userContext";
import { addToCart } from "../functions/addToCart";
import { ProductPageBody } from "../style/ProductPageBody";
import { AddRmCart } from "../style/ProductsPageBody";

const ProductPage = () => {
  const { product } = useLocation().state;
  const { _id, title, description, price, stock, imgUrl } = product;

  const navigate = useNavigate();

  const { name, config } = useContext(UserContext);
  const { cartProducts, setCartProducts } = useContext(ProductsContext);

  const isInCart = cartProducts.some(product => product._id === _id);

  return (
    <ProductPageBody cart={isInCart} stock={stock}>
      <div>
        <div>
          {stock < 1 && <h3>Fora de estoque</h3>}
          <img src={imgUrl}/>
        </div>
        <div>
          <div>
            <h1>{title}</h1>
            <h2>R${price.toFixed(2).replace('.', ',')}</h2>
          </div>
          <p>{description}</p>
          <p><span>no estoque: {stock}</span></p>
          <button onClick={() => addToCart(import.meta.env.VITE_API_URL, name, config, _id, stock, isInCart, cartProducts, setCartProducts)}>
            {isInCart ? <h3>Remover do Carrinho</h3> : <h3>Adicionar ao Carrinho</h3>}
            <AddRmCart />
          </button>
        </div>
      </div>
      <p onClick={() => navigate('/')}>Voltar</p>
    </ProductPageBody>
  );
};

export default ProductPage;


