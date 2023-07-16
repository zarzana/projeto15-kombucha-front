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
    button{
        cursor: pointer;
        color: white;
        background-color: #64C172;
        border-radius: 4px;
        border-style: none;
        height: 100%;
        font-size: 17px;
        transition-duration: 400ms;
        &:hover{
                opacity: 0.9;
        }
    }
`

export const ProductsCardHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 0;
    justify-content: space-between;
    font-size: 20px;
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
    
    button{
        cursor: pointer;
        background-color: #FF5C5C;
        transition-duration: 400ms;
        &:hover{
            opacity: 0.9;
        }
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
        display: flex;
        height: 22px;
        input:disabled{
            margin: 0;
            text-align: center;
            border-radius:0;
            border-style: solid;
            width: 60px;
            border-right: none;
            border-left: none;
            background-color: white;
            border-color: rgb(118,118,118);
        }
        button{
            cursor: pointer;
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
            width: 20%;
            border-style: solid;
            background-color: white;
            color: #1366f4;
            border-color: rgb(118,118,118);
            transition-duration: 400ms;
            &:hover{
                opacity: 0.9;
            }
        }
        button:disabled{
            cursor: default;
            color: rgba(19,102,244,0.2);
            &:hover{
                opacity: 1;
            }
        }
        .minus{
            border-radius:6px 0 0 6px;
            border-right: none;
        }
        .plus{
            border-radius: 0 6px 6px 0;
            border-left: none;
        }
    }
`