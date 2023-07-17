import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import CartProduct from "../components/CartProduct"
import { ProductsContext } from "../contexts/productsContext"
import { UserContext } from "../contexts/userContext"
import { ConfirmButton, PageBody, ProductCardInfo, ProductsCard, ProductsCardContent, ProductsCardHeader } from "../style/CartBody"

const CartPage = () => {
    const [loading, setLoading] = useState(false);
    const {config} = useContext(UserContext)  
    const {setCartProducts} = useContext(ProductsContext)  
    const [prods,setProds] = useState(null)
    const [total,setTotal] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,config);
                const l = createList(data)
                setProds(l)
            } catch ({response: {status, statusText, data}}){
                const errors = `${status} ${statusText}\n${data}`;
                if (status === 401) return console.log(errors)
                Swal.fire({
                    title: `<span style=";font-size: 18px">${errors}</span>`,
                    width: 320,
                    confirmButtonColor: '#5dbb63',
                });
            }
        }
        fetchData();
    },[])
    useEffect(()=>{prods?setTotal(getTotal()):""},[prods])
    
    function createList(p){
        const list = []
        p.map(e=>{
            const pos = list.findIndex(f=>f._id === e._id)
            if(pos>-1){
                list[pos].qtd++
            }else{
                !e.qtd?list.push({...e,qtd:1}):list.push(e)
            }
        })
        return list
    }

    function getTotal(){
        let t = 0
        prods.map(e=>{t+= e.qtd*e.price})
        return t
    }

    async function deleteProd(element){
        let i = prods.indexOf(element)
        prods.splice(i,1)
        setProds([...prods])
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{list:prods},config)
            const cartData = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, config);
            setCartProducts(cartData.data);
        } catch ({response: {status, statusText, data}}){
            Swal.fire({
                title: `<span style=";font-size: 18px">${status} ${statusText}\n${data}</span>`,
                width: 320,
                confirmButtonColor: '#5dbb63',
            });
        }
    }

    function changeQtd(){
        setProds([...prods])
    }

    async function Confirm(){
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{list:prods},config)
            Swal.fire({
                title: '<span style=";font-size: 18px">Deseja voltar e ver mais produtos ou fazer a compra agora?</span>',
                width: 320,
                showDenyButton: true,
                confirmButtonText: 'Comprar',
                denyButtonText: 'Voltar',
                confirmButtonColor: '#5dbb63',
                denyButtonColor: 'lightgrey',
                }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/checkout');
                } else if (result.isDenied) {
                    navigate('/');
                }
            })
            setLoading(false);
        } catch ({response: {status, statusText, data}}){
            setLoading(false);
            Swal.fire({
                title: `<span style=";font-size: 18px">${status} ${statusText}\n${data}</span>`,
                width: 320,
                confirmButtonColor: '#5dbb63',
            });
        }
    }

    return(
        <PageBody>
            <ProductsCard>
                <ProductsCardHeader>
                    Produtos
                </ProductsCardHeader>
                {
                    !prods||prods.length==0?<button onClick={()=>navigate("/")} disabled={prods === null}>Procurar produtos</button>
                    :prods.map(element => <CartProduct key={element._id} prod={element} deleteP={deleteProd} changeQ={changeQtd}/>)
                }
            <p>{prods === null && 'Carregando...'}</p>
            </ProductsCard>
            <ProductsCard>
                <ProductsCardHeader>
                    <>Total</>
                    <b>R$ {total?total.toFixed(2).replace('.',','):""}</b>
                </ProductsCardHeader>
                {!prods||prods.length==0?"":<ConfirmButton disabled={loading} onClick={()=>Confirm()}>{loading? 'Carregando...' : 'Confirmar'}</ConfirmButton>}
            </ProductsCard>
        </PageBody>
    )
}

export default CartPage