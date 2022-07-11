import styled from "styled-components";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const navigate = useNavigate();

    return (
        <Conteiner>
            <Header />
            <Content>
                Compra realizada com sucesso!
                <Button onClick={ () => navigate('/products') }>
                Para retornar à página de produtos, clique aqui!
                </Button>
            </Content>
        </Conteiner>
    );
}

const Conteiner = styled.div`
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    width: 330px;
    min-height: 500px;
    margin: 10px;
    padding: 15px;
    background-color: #F5E9DA;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    margin-top: 80px;
    font-size: 24px;
    color: #be3100;
    text-align: center;
    font-weight: bold;
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    width: 100%;
    height: 70px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #be3100;
`;