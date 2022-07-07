import styled from 'styled-components'
import Button from '../shared/Button.js'
import Input from '../shared/Input.js'
import src from '../assets/images/logo3.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Register() {
  const navigate = useNavigate()
  const URL = 'http://localhost:5000/sign-up'

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    address: '',
  })

  function handleInputChange(e) {
    /*if (e.target.name === 'cpf') {
      setFormData({ ...formData, cpf: cpfMask(e.target.value) })
      console.log(cpfMask(e.target.value))
    } else {*/
      setFormData({ ...formData, [e.target.name]: e.target.value })
    //}
  }

  function signUp(event) {
    event.preventDefault()

    if (
      formData.name !== '' &&
      formData.cpf !== '' &&
      formData.email !== '' &&
      formData.password !== '' &&
      formData.address !== ''
    ) {
      const promise = axios.post(URL, {
        ...formData,
        cpf: cpfMask(formData.cpf),
      })
      promise
        .then(() => {
          alert('Cadastro salvo com sucesso')
          navigate('/')
        })
        .catch((err) => {
          alert(err.response.data)
          setFormData({
            name: '',
            cpf: '',
            email: '',
            password: '',
            address: '',
          })
        })
    } else {
      alert('Todos os campos precisam ser preenchidos')
    }
  }

  function cpfMask(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  return (
    <Container>
      <Header>
        <img src={src} alt="logo" />
        <h1>iBookStore</h1>
      </Header>
      <form onSubmit={signUp}>
        <Input
          value={formData.name}
          type="text"
          name="name"
          onChange={handleInputChange}
          placeholder="Nome Completo"
          required
        />
        <Input
          value={formData.cpf}
          type="number"
          name="cpf"
          onChange={handleInputChange}
          placeholder="CPF"
          required
        />
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
        <Input
          value={formData.address}
          type="text"
          name="address"
          onChange={handleInputChange}
          placeholder="Endereço"
          required
        />
        <Button type="submit" title="Cadastrar" />
      </form>
      <p onClick={() => navigate('/')}>Já tem uma conta? Entre agora!</p>
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
    margin-bottom: 50px;
  }

  p {
    font-weight: 700;
    font-size: 15px;
    color: #f5f0eb;
    margin-top: 36px;
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
