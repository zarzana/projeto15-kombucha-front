import { useLocation, useNavigate } from "react-router-dom";
import { ProductPageBody } from "../style/ProductPageBody";
import { AddRmCart } from "../style/ProductsPageBody";

const ProductPage = () => {
  const { product, cartProducts } = useLocation().state;
  const { _id, title, description, price, stock, imgUrl } = product;

  const navigate = useNavigate();

  const isInCart = cartProducts.some(product => product._id === _id);

  return (
    <ProductPageBody isInCart={isInCart}>
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
          <hr/>
          <p>{description}</p>
          <p><span>no estoque: {stock}</span></p>
          <button>
            {isInCart ? <h3>Remover do Carrinho</h3> : <h3>Adicionar ao Carrinho</h3>}
            <AddRmCart />
          </button>
        </div>
      </div>
      <p onClick={() => navigate(-1)}>Voltar</p>
    </ProductPageBody>
  );
};

export default ProductPage;


