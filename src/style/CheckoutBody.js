import styled from "styled-components"

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

export const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    padding: 8px 20px;
    border-radius: 6px;
    form{
        display: flex;
        flex-direction: column;
        gap:10px;

        label{
            display: flex;
            flex-direction: column;
            gap:5px;
        }

        button{
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
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
            &:disabled{
                cursor: default;
                opacity: 0.5;
            }
        }
    }
`