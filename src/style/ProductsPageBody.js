import { FaArrowCircleLeft } from 'react-icons/fa';
import { PiShoppingCartFill } from 'react-icons/pi';
import { styled } from "styled-components";

export const ProductsPageBody = styled.div`
  font-family: 'Lexend Deca', sans-serif;
  display: flex;
  justify-content: center;
  ul{
    margin-top: 60px;
    display: flex;
    gap: 8px;
    li{
      div:nth-child(1) {
        display: flex;
        h1{
          font-weight: 500;
          margin-bottom: 3px;
        }
      }
      div:nth-child(2) {
        display: flex;
        flex-direction: column;
        height: 110px;
        width: 110px;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        p{

        }
      }
      div:nth-child(3){
        display: flex;
        justify-content: space-between;
      }
    }
  }
`
export const ProductsPageNavBar = styled.div`
  font-family: 'Lexend Deca', sans-serif;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  top: 0;
  position: fixed;
  background-color: lightgray;
  div{
    margin-left: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
    p{
      cursor: pointer;
    }
  }
`
export const StyledCart = styled(PiShoppingCartFill)`
  font-size: 26px;
  display: flex;
  position: fixed;
  right: 0;
  cursor: pointer;
  color: black;
  margin-right: 5px;
`

export const AddRmCart = styled(PiShoppingCartFill)`
cursor: pointer;
color: black;
`

export const StyledArrow = styled(FaArrowCircleLeft)`
  font-size: 26px;
  cursor: pointer;
  color: black;
`