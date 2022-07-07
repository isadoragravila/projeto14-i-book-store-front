import styled from "styled-components";

export default function Button({ title, type }) {
    return (
        <ButtonCss type={type}>{title}</ButtonCss>
    )
}

const ButtonCss = styled.button`
    width: 100%;
    height: 46px;
    background-color: #6F0B00;
    color: #FFFFFF;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    font-weight: 700;
`