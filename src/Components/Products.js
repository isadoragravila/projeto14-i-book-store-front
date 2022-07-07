import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

function Product({ name, image, price }) {
    const navigate = useNavigate();

    function goToProduct() {
        navigate("/products/id");
    }

    function addToCart() {
        navigate("/cart");
    }
    return (
        <ProductBox>
            <ClickProduct onClick={goToProduct}>
                <Name>{name}</Name>
                <img src={image} alt={name} />
            </ClickProduct>
            <Bottom>
                <Price>R$ {price.toFixed(2).replace('.', ',')}</Price>
                <AddCart onClick={addToCart}><ion-icon name="cart"></ion-icon></AddCart>
            </Bottom>
        </ProductBox>
    );
}

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const promise = axios.get("http://localhost:5000/products");
        promise.then(response => {
            console.log(response.data);
            setProducts(response.data);
        });
        promise.catch(err => {
            alert(err.response.data);
        });
    }, []);

    return (
        <Conteiner>
            {products.map(item => <Product key={item._id} name={item.name} image={item.image} price={item.price} />)}
        </Conteiner>
    )
}

const Conteiner = styled.div`
    width: 375px;
    display: flex;
    flex-wrap: wrap;
`;

const ProductBox = styled.div`
    width: 150px;
    min-height: 200px;
    margin: 10px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    img {
        width: 129px;
        height: 193px;
        object-fit: cover;
    }
`;
const ClickProduct = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Name = styled.div`
    font-size: 16px;
    text-align: center;
    margin: 5px;
`;
const Bottom = styled.div`
    width: 120px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
`;

const Price = styled.div`
    font-size: 16px;
    text-align: center;
    margin: 5px;
`;

const AddCart = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    width: 35px;
    height: 25px;
    background-color: #be3100;
    border-radius: 5px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    ion-icon {
        font-size: 20px;
        color: #ffffff;
    }
`;