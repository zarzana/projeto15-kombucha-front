import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { UserContext } from "../contexts/userContext"
import { FormDiv, PageBody } from "../style/CheckoutBody"

const CheckoutPage = () => {
    const {config} = useContext(UserContext)
    
    const [loading, setLoading] = useState(false);
    const [endereco,setEndereco] = useState({logradouro:"",bairro:"",localidade:"",uf:"",numero:"",nome:"",complemento:""})
    const [cpfInput, setCpfInput] = useState("");
    const navigate = useNavigate()

    function validateCEP(value){
        const v = value.replace(/[^0-9]/g,'')
        if(v.length == 8){
            axios.get(`https://viacep.com.br/ws/${v}/json/`)
            .then(({ data: { cep, uf, localidade, erro } } )=>{
                if (erro){
                    setCpfInput("");
                    setEndereco({...endereco, localidade: "", uf: ""});
                    Swal.fire({
                        title: `<span style=";font-size: 18px">CEP invalido</span>`,
                        width: 320,
                        confirmButtonColor: '#5dbb63',
                    });
                } else {
                    setEndereco({...endereco,localidade, uf, cep});
                }
            })
            .catch(() => {
                Swal.fire({
                    title: `<span style=";font-size: 18px">Tente Novamente</span>`,
                    width: 320,
                    confirmButtonColor: '#5dbb63',
                });
            })
        }
        return v
    }

    async function Submit(event){
        event.preventDefault()

        try {
            setLoading(true);
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,config)
            const order = {...endereco,products:data}
            await axios.post(`${import.meta.env.VITE_API_URL}/order`,order,config)
            data.map(async prod=>{
                await axios.put(`${import.meta.env.VITE_API_URL}/products/-${prod.qtd}/${prod._id}`)
            })
            setLoading(false);
            await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{list:[]},config)
            Swal.fire({
                title: `<span style=";font-size: 18px">Parabens, compra feita com sucesso!</span>`,
                width: 320,
                confirmButtonColor: '#5dbb63',
            });
            navigate("/")
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
            <FormDiv>
                <form onSubmit={Submit}>
                    <label>
                        Nome Completo
                        <input type="text" disabled={false} required value={endereco.nome} onChange={e=>setEndereco({...endereco,nome:e.target.value})}/>
                    </label>
                    <label>
                        CEP
                        <input type="text" disabled={false} required value={cpfInput} onChange={e=>setCpfInput(e.target.value)} 
                            onInput={e=>e.target.value = validateCEP(e.target.value)}
                            maxLength={8}
                        />
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
                        <input type="text" disabled={false} required value={endereco.bairro} onChange={e=>setEndereco({...endereco,bairro:e.target.value})}/>
                    </label>
                    <label>
                        Rua/Avenida
                        <input type="text" disabled={false} required value={endereco.logradouro} onChange={e=>setEndereco({...endereco,logradouro:e.target.value})}/>
                    </label>
                    <label>
                        Número
                        <input type="number" disabled={false} required value={endereco.numero} onChange={e=>setEndereco({...endereco,numero:e.target.value})}/>
                    </label>
                    <label>
                        Complemento
                        <input type="text" disabled={false} required value={endereco.complemento} onChange={e=>setEndereco({...endereco,complemento:e.target.value})}/>
                    </label>
                    <button disabled={loading} >{loading ? 'Carregando...' : 'Confirmar'}</button>
                </form>
            </FormDiv>
            <h3 onClick={() => navigate('/carrinho')}>Voltar</h3>
        </PageBody>
    )
}

export default CheckoutPage