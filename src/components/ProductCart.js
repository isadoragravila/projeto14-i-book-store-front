import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ProductCart({ idProduct, quantity }) {
  const [product, setProduct] = useState([])

  useEffect(() => {
    const promise = axios.get(`http://localhost:5000/products/${idProduct}`)
    promise.then((response) => {
      setProduct(response.data)
    })
    promise.catch((err) => {
      alert(err.response.data)
    })
  }, [])

  return (
    <Conteiner>
      <img src={product.image} alt={product.name} />
      <Content>
        <p>{product.name}</p>
        <Values>
          <p>{quantity} un.</p>
          <p>R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</p>
        </Values>
        <ion-icon name="trash-outline"></ion-icon>
      </Content>
    </Conteiner>
  )
}

const Conteiner = styled.div`
  display: flex;
  width: 300px;
  padding: 5px;
  border-bottom: 1px rgba(190, 49, 0, 0.5) solid;
  p {
    font-size: 19px;
    text-align: center;
    color: #000000;
  }
  img {
    width: 80px;
    height: 120px;
    object-fit: cover;
  }
  ion-icon {
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
  padding: 5px;
  position: relative;
`

const Values = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  p {
    font-size: 17px;
  }
`
