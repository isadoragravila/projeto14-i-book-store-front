import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const navigate = useNavigate()

  const menuList = [
    { title: 'Meu Carrinho', path: '/cart', icon: '' },
    { title: 'Produtos', path: '/products', icon: '' },
    { title: 'Sair', path: '/', icon: '' },
  ]
  const [sidebar, setSidebar] = useState(false)

  function returnHome() {
    navigate('/products')
  }

  function menuToggle() {
    if (sidebar === true) {
      setSidebar(false)
      return sidebar
    }
    setSidebar(true)
    return sidebar
  }

  function logOut() {
    navigate('/')
  }

  return (
    <Conteiner>
      <Logo onClick={returnHome}>iBookStore</Logo>
      <Menu>
        <Options>
          <ion-icon onClick={menuToggle} name="menu-outline"></ion-icon>
        </Options>
      </Menu>
      {sidebar ? (
        <Ul>
          {menuList.map((item) => (
            <li onClick={() => navigate(item.path)}>{item.title}</li>
          ))}
        </Ul>
      ) : (
        <></>
      )}
    </Conteiner>
  )
}

const Conteiner = styled.div`
  width: 100%;
  height: 70px;
  background-color: #f5e9da;
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
`

const Logo = styled.h1`
  font-size: 35px;
  color: #be3100;
  cursor: pointer;
`

const Menu = styled.div`
  display: flex;
  ion-icon {
    font-size: 25px;
    color: #be3100;
  }
`
const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100px;
  position: absolute;
  top: 74px;
  right: 4px;
  background-color: #f5e9da;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 15%);

  li {
    color: #be3100;
    font-size: 20px;
    margin: 3px;
    cursor: pointer;
  }
`
