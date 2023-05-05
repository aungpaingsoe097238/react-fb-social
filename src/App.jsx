import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={ <Login/> } />
        <Route path='/chat' element={ <Chat/> } />
      </Routes>
    </>
  )
}

export default App
