import { useEffect, useState } from "react"
import CartProduct from "../components/CartProduct"
import { PageBody, ProductCardInfo, ProductsCard, ProductsCardContent, ProductsCardHeader} from "../style/CartBody"
import { useNavigate } from "react-router-dom"

const CartPage = () => {

    const test2=[
        {
            "id": "64af03de73f8e151ebd7db8e",
            "title": "produto4",
            "description": "descrição do produto4",
            "price": 70.5,
            "stock": 5,
            "imgUrl": "https://img.freepik.com/fotos-gratis/imagem-aproximada-da-cabeca-de-um-lindo-leao_181624-35855.jpg?w=2000"
        },
        {
            "id": "64af03de73f8e151ebd7db8f",
            "title": "produto5",
            "description": "descrição do produto5",
            "price": 69.5,
            "stock": 4,
            "imgUrl": "https://img.freepik.com/fotos-gratis/imagem-aproximada-da-cabeca-de-um-lindo-leao_181624-35855.jpg?w=2000"
        },
        {
            "id": "64af03de73f8e151ebd7db8e",
            "title": "produto4",
            "description": "descrição do produto4",
            "price": 70.5,
            "stock": 5,
            "imgUrl": "https://img.freepik.com/fotos-gratis/imagem-aproximada-da-cabeca-de-um-lindo-leao_181624-35855.jpg?w=2000"
        }
    ]
    
    const [prods,setProds] = useState()
    const [total,setTotal] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () => {
            try{
              const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`);
              const l = createList(data)
              setProds(l)
            } catch ({response: {status, statusText, data}}){
              console.log(`${status} ${statusText}\n${data}`);
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
                    !prods||prods.length==0?<button onClick={()=>navigate("/produtos")}>Procurar produtos</button>
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