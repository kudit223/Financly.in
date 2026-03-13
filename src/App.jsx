import React from 'react';
import './App.css'
import SignUpSignIn from './pages/SignUpSignIn';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App(){
  return(
    <div className='app'>
    <Routes>
    <Route path='/' element={<SignUpSignIn/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </div>
  )
}

export default App;