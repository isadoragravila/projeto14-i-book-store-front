import styled from 'styled-components';
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

export default function SingleProduct() {
    const [product, setProduct] = useState([]);
    const [price, setPrice] = useState(0);
    const { idProduct } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get(`http://localhost:5000/products/${idProduct}`);
        promise.then(response => {
            console.log(response.data);
            setProduct(response.data);
            setPrice(response.data.price);
        });
        promise.catch(err => {
            alert(err.response.data);
        });
    }, []);

    function addToCart() {
        navigate("/cart");
    }

    return (
        <Content>
            <Header />
            <ProductBox>
                <Name>{product.name}</Name>
                <img src={product.image} alt={product.name} />
                <Description>{product.description}</Description>
                <Price>R$ {price.toFixed(2).replace('.', ',')}</Price>
                <AddCart onClick={addToCart}>Adicionar ao carrinho</AddCart>
            </ProductBox>
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductBox = styled.div`
    width: 300px;
    height: 540px;
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
const Description = styled.div`
    font-size: 20px;
    text-align: center;
    margin: 5px;
    color: #000000;
`;
const Name = styled.div`
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    margin: 5px;
    color: #000000;
`;
const Price = styled.div`
    font-size: 23px;
    text-align: center;
    color: #000000;
`;
const AddCart = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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