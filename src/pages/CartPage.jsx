import { useEffect, useState } from "react"
import CartProduct from "../components/CartProduct"
import { PageBody, ProductCardInfo, ProductsCard, ProductsCardContent, ProductsCardHeader} from "../style/CartBody"
import { useNavigate } from "react-router-dom"

const CartPage = () => {
    const test = [{
        imgUrl:"data:image/jpeg;base64,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",
        title:"Kombucha jeyy",
        price:20,
        qtd:1
    },
    {
        imgUrl:"data:image/jpeg;base64,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",
        title:"Kombucha je",
        price:11,
        qtd:1
    }]

    const test2=[
        {
            "_id": "64af03de73f8e151ebd7db8e",
            "title": "produto4",
            "description": "descrição do produto4",
            "price": 70.5,
            "stock": 5,
            "imgUrl": "https://img.freepik.com/fotos-gratis/imagem-aproximada-da-cabeca-de-um-lindo-leao_181624-35855.jpg?w=2000"
        },
        {
            "_id": "64af03de73f8e151ebd7db8f",
            "title": "produto5",
            "description": "descrição do produto5",
            "price": 69.5,
            "stock": 4,
            "imgUrl": "https://img.freepik.com/fotos-gratis/imagem-aproximada-da-cabeca-de-um-lindo-leao_181624-35855.jpg?w=2000"
        },
        {
            "_id": "64af03de73f8e151ebd7db8e",
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
        const l = createList(test2)
        setProds(l)
    },[])
    useEffect(()=>{prods?setTotal(getTotal()):""},[prods])
    
    function createList(p){
        const list = []
        p.map(e=>{
            const pos = list.findIndex(f=>f._id === e._id)
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
                    :prods.map(element => <><hr/><CartProduct prod={element} deleteP={deleteProd} changeQ={changeQtd}/></>)
                }
            </ProductsCard>
            <ProductsCard>
                <ProductsCardHeader>
                    <>Total</>
                    <b>R$ {total}</b>
                </ProductsCardHeader>
            </ProductsCard>
            <button onClick={()=>console.log(list)}>show</button>
        </PageBody>
    )
}

export default CartPage