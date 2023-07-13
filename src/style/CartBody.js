import { styled } from "styled-components";

export const PageBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:100vw;
    height:100vh;
    padding: 8px;
    background-color: #EDEDED;
`

export const ProductsCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: white;
    padding: 8px 20px;
    border-radius: 6px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.12);
    hr{
        width: 100%;
    }
`

export const ProductsCardHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 0;
    justify-content: space-between;
`

export const ProductsCardContent = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap:10px;

    img{
        width:48px;
        height:48px;
    }
`

export const ProductCardInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;

    .Name{
        width:100%
    }

    form{
        height: 22px;
        input{
            margin: 0;
            text-align: center;
            border-radius:0;
            border-style: solid;
            width: 60px;
        }
        button{
        }
    }
`