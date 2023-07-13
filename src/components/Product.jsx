import { AddRmCart, StyledCart } from "../style/ProductsPageBody";

const ProductCard = ({ product }) => {
  const { title, description, price, stock, imgUrl } = product;
  return(
    <li>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <img src={imgUrl}></img>
        {/* <p>{description}</p> */}
      </div>
      <div>
        <p>R${price.toFixed(2).replace('.', ',')}</p>
        <AddRmCart />
      </div>
      <p>estoque: {stock}</p>
    </li>
  );
};

export default ProductCard;