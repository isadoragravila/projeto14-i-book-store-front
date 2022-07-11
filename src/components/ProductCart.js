import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

export default function ProductCart({ idProduct, quantity, setCartProducts }) {
  const [product, setProduct] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const promise = axios.get(`https://i-book-store-back.herokuapp.com/products/${idProduct}`);
    promise.then((response) => {
      setProduct(response.data);
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  }, []);

  function deleteProduct() {
    const confirm = window.confirm("Você tem certeza que deseja remover esse produto do carrinho?");
    if (confirm === true) {
      const body = { productId: idProduct };
      const config = {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      }
      const promise = axios.put(`https://i-book-store-back.herokuapp.com/cart/delete-all`, body, config);
      promise.then(() => {
        getCart();
      });
      promise.catch(err => {
        alert(err.response.data);
      });
    }
  }

  function addOneProduct() {
    const body = { productId: idProduct };
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    const promise = axios.put("https://i-book-store-back.herokuapp.com/cart/add-one", body, config);
    promise.then(() => {
      getCart();
    });
    promise.catch(err => {
      alert(err.response.data);
    });
  }

  function removeOneProduct() {
    const body = { productId: idProduct };
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    const promise = axios.put("https://i-book-store-back.herokuapp.com/cart/delete-one", body, config);
    promise.then(() => {
      getCart();
    });
    promise.catch(err => {
      alert(err.response.data);
    });
  }

  function getCart() {
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    const promise = axios.get(`https://i-book-store-back.herokuapp.com/cart`, config);
    promise.then(response => {
      setCartProducts(response.data);
    });
    promise.catch(err => {
      alert(err.response.data);
    });
  }

  return (
    <Conteiner>
      <img src={product.image} alt={product.name} />
      <Content>
        <p>{product.name}</p>
        <Values>
          <Quantity>
            <Icon onClick={addOneProduct}>
              <ion-icon name="add-circle-outline"></ion-icon>
            </Icon>
            <p>{quantity} un.</p>
            <Icon onClick={removeOneProduct}>
              <ion-icon name="remove-circle-outline"></ion-icon>
            </Icon>
          </Quantity>
          <Price>
            <p>R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</p>
          </Price>
        </Values>
        <Trash onClick={deleteProduct}>
          <ion-icon name="trash-outline"></ion-icon>
        </Trash>
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
  padding: 5px;
  position: relative;
`;

const Values = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  p {
    font-size: 17px;
  }
`;

const Quantity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 3px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  p {
    margin: 5px 0;
  }
`;

const Icon = styled.div`
  ion-icon {
    font-size: 20px;
    cursor: pointer;
    color: #be3100;
  }
`;

const Price = styled.div`
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  p {
    margin: 5px;
  }
`;

const Trash = styled.div`
  ion-icon {
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
