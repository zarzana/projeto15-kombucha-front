import axios from "axios"
import { PageBody,FormDiv } from "../style/CheckoutBody"
import { useState,useContext } from "react"
import { UserContext } from "../contexts/userContext"
import { useNavigate } from "react-router-dom"

const CheckoutPage = () => {
    const {config} = useContext(UserContext)  
    const [endereco,setEndereco] = useState({logradouro:"",bairro:"",localidade:"",uf:"",numero:"",nome:""})
    const navigate = useNavigate()

    function validateCEP(value){
        const v = value.replace(/[^0-9]/g,'')
        if(v.length == 8){
            console.log(v)
            axios.get(`https://viacep.com.br/ws/${v}/json/`)
            .then(resp=>{
                delete resp.data.ddd
                delete resp.data.gia
                delete resp.data.ibge
                delete resp.data.siafi
                resp.data.erro?alert("CEP invalido"):setEndereco({...endereco,...resp.data})})
            .catch(err=>alert("tente novamente"))
        }
        return v
    }

    async function Submit(event){
        event.preventDefault()

        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,config)
            const order = {...endereco,products:data}
            await axios.post(`${import.meta.env.VITE_API_URL}/order`,order,config)
            data.map(async prod=>{
                await axios.put(`${import.meta.env.VITE_API_URL}/products/-${prod.qtd}/${prod._id}`)
            })
            await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{list:[]},config)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <PageBody>
            <FormDiv>
                <form onSubmit={Submit}>
                    <label>
                        Nome Completo
                        <input type="text" required value={endereco.nome} onChange={e=>setEndereco({...endereco,nome:e.target.value})}/>
                    </label>
                    <label>
                        CEP
                        <input type="text" onInput={e=>e.target.value = validateCEP(e.target.value)} maxLength={8} required/>
                    </label>
                    <label>
                        Estado
                        <input required disabled value={endereco.uf}/>
                    </label>
                    <label>
                        Cidade
                        <input required disabled value={endereco.localidade}/>
                    </label>
                    <label>
                        Bairro
                        <input type="text" required value={endereco.bairro} onChange={e=>setEndereco({...endereco,bairro:e.target.value})}/>
                    </label>
                    <label>
                        Rua/Avenida
                        <input type="text" required value={endereco.logradouro} onChange={e=>setEndereco({...endereco,logradouro:e.target.value})}/>
                    </label>
                    <label>
                        Número
                        <input type="number" required value={endereco.numero} onChange={e=>setEndereco({...endereco,numero:e.target.value})}/>
                    </label>
                    <button>confirm</button>
                </form>
            </FormDiv>
        </PageBody>
    )
}

export default CheckoutPage