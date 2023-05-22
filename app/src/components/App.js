import {React, useEffect, useState} from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from '../pages';
import ProductCreate from '../pages/product/create';
import ProductList from '../pages/product/list';
import CategoryCreate from '../pages/category/create';
import CategoryList from '../pages/category/list';
import Login from "../pages/login/index";
import Forbidden from "../pages/login/forbidden";
import NavBar from './Navbar';
import NavBarLogin from './NavbarLogin';

import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import Protected from './Protected';

function App() {
    
    const [isSignedIn, setIsSignedIn] = useState(null)
    const logged = localStorage.getItem('logged');
    
    useEffect(() => {
        if(logged){
            setIsSignedIn(logged)
        }
    }, [logged])
    

    return (
        <div className='container'>
            <NotificationContainer/>
            {isSignedIn === "true" ? (
            <div>
                <NavBar/>
                <Routes>
                    <Route path='/' element={
                        <Protected isSignedIn={isSignedIn}>
                            <Home/>
                        </Protected>
                    } />
                    <Route path='/product/create' element={
                        <Protected isSignedIn={isSignedIn}>
                            <ProductCreate/>
                        </Protected>
                    } />
                    <Route path='/product/list' element={
                        <Protected isSignedIn={isSignedIn}>
                            <ProductList/>
                        </Protected>
                    } />
                    <Route path='/category/create' element={
                        <Protected isSignedIn={isSignedIn}>
                            <CategoryCreate/>
                        </Protected>
                    } />
                    <Route path='/category/list' element={
                        <Protected isSignedIn={isSignedIn}>
                            <CategoryList/>
                        </Protected>
                    } />
                </Routes>
            </div>
            ) : (
            <div>
                <NavBarLogin/>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='*' element={<Forbidden />}/>
                </Routes>
            </div>
            )}    
        </div>
    );
}

export default App;