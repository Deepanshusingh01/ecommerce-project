import React from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';
import CreateUser from './components/CreateUser';
import { Routes, Route } from 'react-router-dom';
import { createContext } from 'react';

export const Context = createContext();

function App() {

    // const navigate = useNavigate();

    return (

        <>
            <Context.Provider>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create_user" element={<CreateUser />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Context.Provider>
        </>
    );
}

export default App;
