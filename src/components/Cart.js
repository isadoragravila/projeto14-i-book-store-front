import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './Header';
import UserContext from '../contexts/UserContext';

function Product({ idProduct, quantity }) {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const promise = axios.get(`http://localhost:5000/products/${idProduct}`);
        promise.then(response => {
            setProduct(response.data);
        });
        promise.catch(err => {
            alert(err.response.data);
        });
    }, []);
    return (<div>{product.name} {quantity}</div>);
}

export default function Cart() {
    const [cartProducts, setCartProducts] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        const promise = axios.get(`http://localhost:5000/cart`, config);
        promise.then(response => {
            setCartProducts(response.data);
        });
        promise.catch(err => {
            alert(err.response.data);
        });
    }, []);

    function goToProducts() {
        navigate(`/products`);
    }

    function finishPurchase() {
        //falta aqui
        const body = {
            payment: 'boleto',
            value: 150,
            products: []
        };
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        //botar await
        const promiseSale = axios.post("http://localhost:5000/sales", body, config);
        promiseSale.then(() => {
            const promiseCart = axios.delete("http://localhost:5000/sales", config);
            promiseCart.then(() => {
                navigate("/");
            });
            promiseCart.catch(err => {
                alert(err.response.data);
            });
        });
        promiseSale.catch(err => {
            alert(err.response.data);
        });
    }

    return (
        <Content>
            <Header />
            <Purchases>
                {cartProducts.map((item, index) => <Product key={index} idProduct={item.productId} quantity={item.quantity} />)}
                <Button onClick={goToProducts}>Continuar comprando</Button>
                <Button onClick={finishPurchase}>Finalizar a compra</Button>
            </Purchases>
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const Purchases = styled.div`
    width: 300px;
    margin: 10px;
    padding: 15px;
    background-color: #F5E9DA;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    margin-top: 80px;
    img {
        width: 200px;
        height: 299px;
        object-fit: cover;
    }
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;
    height: 50px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #be3100;
`;