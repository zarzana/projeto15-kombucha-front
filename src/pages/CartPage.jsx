import { useContext, useEffect, useState } from "react"
import CartProduct from "../components/CartProduct"
import { PageBody, ProductCardInfo, ProductsCard, ProductsCardContent, ProductsCardHeader} from "../style/CartBody"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/userContext"
import axios from "axios"

const CartPage = () => {
    const {config} = useContext(UserContext)    
    const [prods,setProds] = useState()
    const [total,setTotal] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () => {
            try{
              const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,config);
              const l = createList(data)
              setProds(l)
            } catch ({response: {status, statusText, data}}){
                alert(`${status} ${statusText}\n${data}`);
            }
        }
        fetchData();
    },[])
    useEffect(()=>{prods?setTotal(getTotal()):""},[prods])
    
    function createList(p){
        const list = []
        p.map(e=>{
            const pos = list.findIndex(f=>f.id === e.id)
            if(pos>-1){
                list[pos].qtd++
            }else{
                list.push({...e,qtd:1})
            }
        })
        return list
    }

    function getTotal(){
        let t = 0
        prods.map(e=>{t+= e.qtd*e.price})
        return t
    }

    function deleteProd(element){
        let i = prods.indexOf(element)
        prods.splice(i,1)
        setProds([...prods])
    }

    function changeQtd(){
        setProds([...prods])
    }

    return(
        <PageBody>
            <ProductsCard>
                <ProductsCardHeader>
                    Produtos
                </ProductsCardHeader>
                {
                    !prods||prods.length==0?<button onClick={()=>navigate("/")}>Procurar produtos</button>
                    :prods.map(element => <CartProduct key={element._id} prod={element} deleteP={deleteProd} changeQ={changeQtd}/>)
                }
            </ProductsCard>
            <ProductsCard>
                <ProductsCardHeader>
                    <>Total</>
                    <b>R$ {total}</b>
                </ProductsCardHeader>
            </ProductsCard>
        </PageBody>
    )
}

export default CartPage