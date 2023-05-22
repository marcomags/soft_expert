import React, { useEffect, useState } from "react";
import { NotificationManager } from 'react-notifications'
import ProductCard from "../components/ProductCard";
import api from "./../service/api"

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        try {
            api.get('product/get.php')
                .then((response) => {
                    if(response.data && response.data.length > 0)
                    {
                        setProducts(response.data);
                    }
                })
        } catch (error) {
            NotificationManager.error('Oops! Unable to load categories. Reload the page, please.', 'Error!');
        }
    }, [])


    return (
        <div className="container">
            <div className='row'>
                <div className='col my-4'><h2>Products</h2></div>
            </div>
            <div className="row justify-content-center">
                {products.map((product) => {
                    return <ProductCard product={product} key={product.id}/>
                })}
            </div>
        </div>
    );
};

export default Home;