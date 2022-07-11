import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './Header';
import UserContext from '../contexts/UserContext';

function Product({ name, image, price, id, quantity }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    function goToProduct() {
        navigate(`/products/${id}`);
    }

    function addToCart() {
        if (quantity <= 0) {
            alert("Produto indisponível");
            return;
        }
        const body = { productId: id };
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        const promise = axios.put("https://i-book-store-back.herokuapp.com/cart/add-one", body, config);
        promise.then(() => {
            alert("Produto adicionado no carrinho!");
        });
        promise.catch(err => {
            alert(err.response.data);
        });
    }

    return (
        <ProductBox>
            <ClickProduct onClick={goToProduct}>
                <Name>{name}</Name>
                <img src={image} alt={name} />
            </ClickProduct>
            <Bottom>
                {quantity > 0 ?
                    (<Price>R$ {price.toFixed(2).replace('.', ',')}</Price>
                    ) : (
                        <Price>Indisponível</Price>
                    )}
                <AddCart onClick={addToCart}><ion-icon name="cart"></ion-icon></AddCart>
            </Bottom>
        </ProductBox>
    );
}

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://i-book-store-back.herokuapp.com/products");
        promise.then(response => {
            setProducts(response.data);
        });
        promise.catch(err => {
            alert(err.response.data);
        });
    }, []);

    return (
        <Content>
            <Header />
            <Conteiner>
                {products.map(item => <Product key={item._id} name={item.name} image={item.image} price={item.price} id={item._id} quantity={item.quantity} />)}
            </Conteiner>
        </Content>

    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const Conteiner = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 80px;
`;

const ProductBox = styled.div`
    width: 160px;
    height: 300px;
    margin: 10px;
    padding: 5px;
    background-color: #F5E9DA;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
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
    color: #000000;
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
    color: #000000;
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