import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { AddRmCart } from "../style/ProductsPageBody";

const ProductCard = ({ product, cartProducts, setCartProducts, setProducts }) => {
  const { _id, title, description, price, stock, imgUrl } = product;

  const { name } = useContext(UserContext);

  const addToCart = async (inCart) => {
    if (!name) return alert('Para adicionar produtos no carrinho você deve estar logado');
    if (stock < 1) return alert('Não há nenhum desse produto no no estoque');
    if (inCart) return alert('O produto já está adicionado no carrinho');

    try {
      //FAZER REQUISIÇÃO DE ADICIONAR(POST) E PEGAR(GET) PRODUTOS DO CARRINHO
      setCartProducts(previous => ([...previous, { _id }]));

      await axios.put((`${import.meta.env.VITE_API_URL}/products/${-1}/${_id}`));

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(data);
    } catch ({response: {status, statusText, data}}){
      alert(`${status} ${statusText}\n${data}`);
    }
  };

  return(
    <li>
      <div>
        {stock < 1 && <h2>Fora de estoque</h2>}
        <img src={imgUrl}></img>
        <hr />
      </div>
      <div>
        <p>{title}</p>
        <p>R${price.toFixed(2).replace('.', ',')}</p>
        <p><span>no estoque: {stock}</span></p>
        <button onClick={() => addToCart(cartProducts.find(product => product._id === _id))}>
          {cartProducts.some(product => product._id === _id)
            ?
            <h3>Incluso no Carrinho</h3>
            :
            <h3>Adicionar ao Carrinho</h3>
          }
          <AddRmCart />
        </button>
      </div>
    </li>
  );
};

export default ProductCard;