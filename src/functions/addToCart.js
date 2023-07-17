import axios from "axios";
import Swal from "sweetalert2";

export const addToCart = async (URL, name, config, _id, stock, isInCart, cartProducts, setCartProducts, setLoading) => {
  if (stock < 1) return;
  
  if (!name) {
    return Swal.fire({
      title: `<span style=";font-size: 18px">Para adicionar produtos no carrinho você deve estar logado</span>`,
      width: 320,
      confirmButtonColor: '#5dbb63',
    });
  }
  
  try {
    setLoading(true);
    if (isInCart) {
      const newCart = cartProducts.filter((product) => product._id !== _id);
      await axios.post(`${URL}/cart`,{list:newCart},config);
    } else {
      await axios.post(`${URL}/cart/${_id}`, [], config);
    }

    const cartData = await axios.get(`${URL}/cart`, config);
    setCartProducts(cartData.data);
    setLoading(false);
  } catch ({response: {status, statusText, data}}){
    setLoading(false);
    Swal.fire({
      title: `<span style=";font-size: 18px">${status} ${statusText}\n${data}</span>`,
      width: 320,
      confirmButtonColor: '#5dbb63',
    });
  }
};