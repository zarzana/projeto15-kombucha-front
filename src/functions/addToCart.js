import axios from "axios";

export const addToCart = async (URL, name, config, _id, stock, isInCart, cartProducts, setCartProducts) => {
  if (!name) return alert('Para adicionar produtos no carrinho você deve estar logado');
  if (stock < 1) return alert('Não há nenhum desse produto no estoque');
  
  try {
    if (isInCart) {
      const newCart = cartProducts.filter((product) => product._id !== _id);
      await axios.post(`${URL}/cart`,{list:newCart},config);
    } else {
      await axios.post(`${URL}/cart/${_id}`, [], config);
    }

    const cartData = await axios.get(`${URL}/cart`, config);
    setCartProducts(cartData.data);
  } catch ({response: {status, statusText, data}}){
    alert(`${status} ${statusText}\n${data}`);
  }
};