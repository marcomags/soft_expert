import {React} from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from '../pages';
import Cart from '../pages/cart.js';
import NavBar from './Navbar';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

function App() {

    //Create session in sessionStorage
    const session_id = sessionStorage.getItem('session_id');
    if(session_id == null){
        sessionStorage.setItem('session_id', Date.now());
    }
    
    return (
        <div className='container'>
            <NotificationContainer/>
            <NavBar/>
            <hr className='mt-0'/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/cart' element={<Cart/>} />
            </Routes>
        </div>
    );
}

export default App;