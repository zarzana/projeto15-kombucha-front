import { styled } from "styled-components";

export const SignBody = styled.div`
  font-family: 'Lexend Deca', sans-serif;
  div{
    cursor: pointer;
    text-align: center;
    margin-top: 20px;
    color: gray;
    font-size: 20px;
    font-weight: 500;
    transition-duration: 400ms;
    &:hover{
      color: #5dbb63;
    }
  }
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
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: none;
    background: #5dbb63;
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
    cursor: pointer;
    font-size: 14px;
    line-height: 17px;
    color: #5dbb63;
  }
`

export const Logo = styled.h1`
  word-break: normal;
  text-align: center;
  margin-bottom: 24px;
  font-weight: 1000;
  font-size: 50px;
  color: #5dbb63;
`;