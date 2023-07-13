import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { AddRmCart, StyledProductCard } from "../style/ProductsPageBody";

const ProductCard = ({ product, cartProducts, setCartProducts, setProducts }) => {
  const { _id, title, description, price, stock, imgUrl } = product;

  const { config, name } = useContext(UserContext);

  const isInCart = cartProducts.some(product => product._id === _id);

  const addToCart = async () => {
    if (!name) return alert('Para adicionar produtos no carrinho você deve estar logado');
    if (stock < 1) return alert('Não há nenhum desse produto no no estoque');
    //remover produto do carrinho E devolver a quantidade do mesmo ao estoque
    if (isInCart) return alert('Ainda falta implementar essa funcionalidade');

    try {
      await axios.put((`${import.meta.env.VITE_API_URL}/products/${-1}/${_id}`));

      const productsData = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(productsData.data);

      await axios.post(`${import.meta.env.VITE_API_URL}/cart/${_id}`, [], config);
      const cartData = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, config);
      setCartProducts(cartData.data);

    } catch ({response: {status, statusText, data}}){
      alert(`${status} ${statusText}\n${data}`);
    }
  };

  return(
    <StyledProductCard isInCart={isInCart}>
      <div>
        {stock < 1 && <h2>Fora de estoque</h2>}
        <img src={imgUrl}></img>
        <hr />
      </div>
      <div>
        <p>{title}</p>
        <p>R${price.toFixed(2).replace('.', ',')}</p>
        <p><span>no estoque: {stock}</span></p>
        <button onClick={addToCart}>
          {isInCart
            ?
            <h3>Remover do Carrinho</h3>
            :
            <h3>Adicionar ao Carrinho</h3>
          }
          <AddRmCart />
        </button>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;