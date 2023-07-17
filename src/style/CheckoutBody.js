import styled from "styled-components"

export const PageBody = styled.div`
    h3{
        cursor: pointer;
        margin-top: 10px;
        color: black;
        transition-duration: 400ms;
        font-weight: 500;
        &:hover{
            color: #FF2E2E;
        }
    }
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
    font-weight: 500;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    padding: 8px 20px;
    border-radius: 6px;
    form{
        font-weight: 500;
        display: flex;
        flex-direction: column;
        gap:10px;

        label{
            display: flex;
            flex-direction: column;
            gap:5px;
        }

        input{
            padding-left: 6px;
            user-select: text;
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            font-size: 17px;
            line-height: 21px;
            color: #666666;
            border-radius: 8px;
            &:disabled{
                cursor: default;
                opacity: 0.5;
                background: #F2F2F2;
            }
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
            height: 32px;
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