import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from 'pages/Login';
import { Signup } from 'pages/Signup';
import { Recovery } from 'pages/Recovery';
import { Navigation } from '../Navigation';
import { Dashboard } from 'pages/Dashboard';
import { Profile } from 'pages/Profile';
import { initFakeServer } from 'utils/server';

initFakeServer();

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigation />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/recovery' element={<Recovery />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    </BrowserRouter>
);
export default App;
