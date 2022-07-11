import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './Header';
import ProductCart from './ProductCart';
import UserContext from '../contexts/UserContext';

export default function Cart() {
    const [cartProducts, setCartProducts] = useState([]);
    const [payment, setPayment] = useState('boleto');
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
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
    }, []);

    const price = () => {
        let cont = 0;
        for (let i = 0; i < cartProducts.length; i++) {
            cont += cartProducts[i].quantity * cartProducts[i].price
        }
        return cont;
    }

    function goToProducts() {
        navigate(`/products`);
    }

    async function finishPurchase() {
        const body = {
            payment,
            value: price(),
            products: cartProducts
        };
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        try {
            await axios.post("https://i-book-store-back.herokuapp.com/sales", body, config);
            await axios.delete("https://i-book-store-back.herokuapp.com/sales", config);
            await axios.put("https://i-book-store-back.herokuapp.com/inventory", cartProducts, config);
            //mudar rota para o checkout
            navigate("/products");
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return (
        <Content>
            <Header />
            <Purchases>
                {cartProducts.length === 0 ? <p>Seu carrinho está vazio</p> : null}
                {cartProducts.map((item, index) => <ProductCart key={index} idProduct={item.productId} quantity={item.quantity} setCartProducts={setCartProducts} />)}
                <Total>Valor total: <div>R$ {price().toFixed(2).replace('.', ',')}</div></Total>
                <Payment>
                    <p>Forma de pagamento:</p>
                    <Box border={payment === 'boleto' ? "rgba(190, 49, 0, 0.5)" : "none"} onClick={() => setPayment('boleto')}>Boleto</Box>
                    <Box border={payment === 'debito' ? "rgba(190, 49, 0, 0.5)" : "none"} onClick={() => setPayment('debito')}>Débito</Box>
                    <Box border={payment === 'credito' ? "rgba(190, 49, 0, 0.5)" : "none"} onClick={() => setPayment('credito')}>Crédito</Box>
                </Payment>
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
    width: 330px;
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
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
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

const Total = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #be3100;
`;

const Payment = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 50px;
    p {
        font-size: 16px;
        width: 90px;
        word-break: break-word;
        text-align: center;
        color: #be3100;
    }
`;

const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 60px;
    height: 50px;
    font-size: 14px;
    background-color: #ffffff;
    color: #be3100;
    border: 1px ${props => props.border} solid;
    border-radius: 5px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;