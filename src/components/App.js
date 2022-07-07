import '../assets/reset.css'

import styled from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import { useState } from 'react'
import UserContext from '../contexts/UserContext'

export default function App() {
  const [user, setUser] = useState({})

  return (
    <Main>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </Main>
  )
}

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #be3100;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  font-family: 'Arima', cursive;

  h1 {
    font-family: 'Splash', cursive;
    font-size: 40px;
  }
`
