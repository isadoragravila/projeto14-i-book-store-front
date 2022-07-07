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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ProductBox = styled.div`
    width: 150px;
    height: 290px;
    margin: 10px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
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
    cursor: pointer;
`;
const Name = styled.div`
    font-size: 16px;
    text-align: center;
    margin: 5px;
    color: #ffffff;
`;
const Bottom = styled.div`
    width: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
`;

const Price = styled.div`
    font-size: 16px;
    text-align: center;
    color: #ffffff;
`;

const AddCart = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 25px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    ion-icon {
        font-size: 20px;
        color: #be3100;
    }
`;