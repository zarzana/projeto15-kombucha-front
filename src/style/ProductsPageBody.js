import { FaArrowCircleLeft } from 'react-icons/fa';
import { PiShoppingCartFill } from 'react-icons/pi';
import { styled } from "styled-components";

export const ProductsPageBody = styled.div`
  h1{
    text-align: center;
    border-radius: 100%;
    font-weight: 500;
    font-size: 18px;
    height: 19px;
    width: 19px;
    background-color: white;
    position: fixed;
    right: 0;
    margin-right: 5px;
    top: 34px;
    z-index: 1;
  }
  font-family: 'Lexend Deca', sans-serif;
  display: flex;
  justify-content: center;
  ul{
    @media (min-width: 352px) {
      max-width: 352px;
    }
    @media (min-width: 550px) {
      max-width: 100%;
    }
    min-width: 352px;
    display: flex;
    margin-top: 68px;
    gap: 8px;
    flex-wrap: wrap;
  }
`
export const StyledProductCard = styled.li`
&:hover{
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
background-color: white;
box-sizing: content-box;
border: 2px solid lightgray;
border-radius: 8px;
width: 168px;
div:nth-child(1) {
  cursor: pointer;
  h2{
    width: 190px;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
    transform: rotate(-45deg);
    position: absolute;
    z-index: 1;
    font-weight: 500;
    font-size: 26px;
    color: red;
    align-self: center;
    margin-top: 60px;
  }
  hr{
    margin-top: -1px;
    width: 100%;
    border-color: lightgray;
  }
  display: flex;
  flex-direction: column;
  height: 168px;
  width: 168px;
  img{
    position: relative;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
div:nth-child(2){
  margin-top: -8px;
  display: flex;
  flex-direction: column;
  p{
    max-width: 168px;
    overflow: scroll hidden;
    white-space: nowrap;
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
`
export const ProductsPageNavBar = styled.div`
  font-family: 'Lexend Deca', sans-serif;
  z-index: 2;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  top: 0;
  position: fixed;
  background-color: #5dbb63;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  div{
    margin-left: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
    p{
      cursor: pointer;
      margin-left: 3px;
      font-weight: 500;
      font-size: 20px;
      transition-duration: 400ms;
      &:hover{
        color: #5dbb63;
      }
    }
    span{
      max-width: 230px;
      overflow: scroll hidden;
      white-space: nowrap;
      font-weight: 500;
      font-size: 20px;
    }
  }
`
export const StyledCart = styled(PiShoppingCartFill)`
  font-size: 40px;
  display: flex;
  position: fixed;
  right: 0;
  cursor: pointer;
  color: black;
  margin-right: 5px;
`

export const AddRmCart = styled(PiShoppingCartFill)`
  cursor: pointer;
  font-size: 40px;
  color: white;
`

export const StyledArrow = styled(FaArrowCircleLeft)`
  font-size: 26px;
  cursor: pointer;
  color: black;
`