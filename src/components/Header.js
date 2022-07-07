import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    function returnHome () {
        navigate("/products");
    }
    function logOut () {
        navigate("/");
    }

    return (
        <Conteiner>
            <Logo onClick={returnHome}>iBookStore</Logo>
            <Menu>
                <Options>
                    <ion-icon name="menu-outline"></ion-icon>
                </Options>
                <Options onClick={logOut}>
                    <ion-icon name="log-out-outline"></ion-icon>
                </Options>
            </Menu>
        </Conteiner>
    )
}

const Conteiner = styled.div`
    width: 100%;
    height: 70px;
    background-color: #F5E9DA;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
`;

const Logo = styled.h1`
    font-size: 35px;
    color: #be3100;
`;

const Menu = styled.div`
    display: flex;
    width: 100px;
    justify-content: space-around;
    ion-icon {
        font-size: 25px;
        color: #be3100;
    }
`;
const Options = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
`;
