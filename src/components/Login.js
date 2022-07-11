import styled from 'styled-components'
import Button from '../shared/Button.js'
import Input from '../shared/Input.js'
import src from '../assets/images/logo3.png'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import UserContext from '../contexts/UserContext'

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const URL = 'https://i-book-store-back.herokuapp.com/sign-in'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function signIn(event) {
    event.preventDefault()
    const promise = axios.post(URL, formData)
    promise
      .then((response) => {
        setUser(response.data)
        navigate('/products')
      })
      .catch(() => {
        alert('E-mail ou senha incorretos!! Tente novamente.')
        setFormData({
          email: '',
          password: '',
        })
      })
  }

  return (
    <Container>
      <Header>
        <img src={src} alt="logo" />
        <h1>iBookStore</h1>
      </Header>
      <form onSubmit={signIn}>
        <Input
          value={formData.email}
          type="text"
          name="email"
          onChange={handleInputChange}
          placeholder="E-mail"
          required
        />
        <Input
          value={formData.password}
          type="password"
          name="password"
          onChange={handleInputChange}
          placeholder="Senha"
          required
        />
        <Button type="submit" title="Entrar" />
      </form>
      <p onClick={() => navigate('/sign-up')}>Primeira vez? Cadastre-se!</p>
    </Container>
  )
}

const Container = styled.section`
  margin: auto 25px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #f5f0eb;
    margin-bottom: 70px;
  }

  p {
    font-weight: 700;
    font-size: 15px;
    color: #f5f0eb;
    margin-top: 36px;
    cursor: pointer;
  }
`

const Header = styled.div`
  display: flex;
  text-align: center;

  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
`
