import { styled } from "styled-components";

export const ProductPageBody = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100vw;
height: 100vh;
div:nth-child(1){
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 2px solid lightgray;
  border-radius: 8px;
  width: 340px;
  div:nth-child(1){
    display: flex;
    justify-content: center;
    margin-top: unset;
    padding-left: 2px;
    padding-right: 2px;
    width: 340px;
    height: 340px;
    border: none;
    h3{
      width: 370px;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: white;
      transform: rotate(-45deg);
      position: absolute;
      z-index: 1;
      font-weight: 500;
      font-size: 50px;
      color: red;
      align-self: center;
      margin-top: -25px;
      margin-left: 10px;
    }
    img{
        position: relative;
        border-radius: 6px 6px 0 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
        margin-bottom: 2px;
    }
  }
  div:nth-child(2){
    border-radius: 0 0 6px 6px;
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    hr{
      margin-top: 2px;
      margin-bottom: -1px;
      width: 100%;
      border-color: lightgray;
    }
    div{
      height: auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-weight: 700;
      font-size: 18px;
      h1{
      }
      h2{
        color: #5dbb63;
        margin-right: 4px;
      }
    }
    p{
      margin-left: 2px;
      font-weight: 500;
      margin-bottom: 3px;
      span{
        color: lightgray;
      }
    }
    button{
      cursor: pointer;
      background-color: ${({ isInCart }) => isInCart ? 'lightgray' : '#5dbb63'};
      width: 100%;
      height: 53px;
      font-size: 18px;
      font-weight: 500;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 0 0 6px 6px;
      transition-duration: 400ms;
      &:hover{
        opacity: 0.9;
        }
      }
    }
  }
  p:last-child{
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
`