import { useState } from "react"
import { ProductCardInfo, ProductsCardContent } from "../style/CartBody"

export default function CartProduct(props){
    const element = props.prod
    const [qtd,setQtd] = useState(element.qtd)

    function handleChange(v){
        element.qtd = v
        setQtd(v)
    }

    return(
    <>
        <hr/>
        <ProductsCardContent>
            <img src={element.imgUrl}/>
            <ProductCardInfo>
                <span className="Name">{element.title}</span>
                <form onSubmit={event=>event.preventDefault()}>
                    <button onClick={()=>{handleChange(qtd-1);props.changeQ()}} disabled={qtd==1}>{"-"}</button>
                    <input type="text" inputMode="numeric" required value={qtd} disabled/>
                    <button onClick={()=>{handleChange(qtd+1);props.changeQ()}} disabled={qtd==element.stock}>{"+"}</button>
                </form>
                <span>{`R$ ${element.price*qtd}`}</span>
            </ProductCardInfo>
            <button onClick={()=>{props.deleteP(element)}}>Remove</button>
        </ProductsCardContent>
    </>
)}