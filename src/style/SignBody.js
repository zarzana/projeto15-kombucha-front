import { styled } from "styled-components";

export const SignBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  form{
    display: flex;
    flex-direction: column;
    row-gap: 6px;
  }
  input{
    font-family: 'Lexend Deca', sans-serif;
    padding-left: 11px;
    user-select: text;
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 20px;
    line-height: 25px;
    color: #666666;
        &:disabled{
            cursor: default;
            opacity: 0.5;
            background: #F2F2F2;
        }
        &::placeholder{
            color: #DBDBDB;
        }
  }
  button{
    font-family: 'Lexend Deca', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: none;
    background: lightgray;
    width: 303px;
    height: 45px;
    margin-bottom: 12px;
    font-size: 21px;
    line-height: 26px;
    color: #FFFFFF;
    &:disabled{
        cursor: default;
        opacity: 0.5;
    }
    &:hover{
        opacity: 0.9;
        transition-duration: 200ms;
    }
  }
  p{
    font-family: 'Lexend Deca', sans-serif;
    cursor: pointer;
    margin-top: 25px;
    font-size: 14px;
    line-height: 17px;
    color: lightgray;
  }
`