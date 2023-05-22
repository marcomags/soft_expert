import React, { useEffect, useState } from "react";
import { NotificationManager } from 'react-notifications'
import { Link } from "react-router-dom";
import ProductCart from "../components/ProductCart";
import Table from 'react-bootstrap/Table';
import api from "./../service/api"
import Alert from 'react-bootstrap/Alert';
import { NumericFormat } from 'react-number-format';
import Button from "react-bootstrap/esm/Button";

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState({tax: 0, price: 0});

    const handleRefreshProduct = () => {
        getProductsBySession();
    };

    const getProductsBySession = () => {
        api.get('cart/getBySession.php?session_id=' + sessionStorage.getItem('session_id'))
            .then((response) => {
                if(response.data && response.data.length > 0)
                {
                    setProducts(response.data);
                
                    //Calc Total
                    var total_price = 0;
                    var total_tax = 0;

                    if(response.data.length > 0){
                        response.data.map((product) => {
                            total_price = total_price + (product.product_price*product.qty);
                            total_tax = total_tax + ((product.product_price*product.qty)*(product.category_tax/100));
                            return true
                        })

                        setTotal({tax: total_tax, price: total_price})
                    }
                }
                else{
                    setProducts([]);
                }
            })
    }

    const saveSale = () => {
        api.post('cart/saveSale.php', {total_price: total.price, total_tax: total.tax, session_id: sessionStorage.getItem('session_id')})
        .then((response) => {
            if(response.data.status === 'success'){
                NotificationManager.success(response.data.message, 'Success!');
                //Clear actual session
                sessionStorage.clear();

                //Generate a new session
                sessionStorage.setItem('session_id', Date.now());

                //Refresh products to clear cart
                getProductsBySession();
            }
            else{
                NotificationManager.error(response.data.message, 'Error!');
            }
        })
        .catch((err) => {
            NotificationManager.error('Oops! Unable save product on cart. Try again.', 'Error');    
        });
    }

    useEffect(() => {
        try {
            getProductsBySession();
        } catch (error) {
            NotificationManager.error('Oops! Unable to load categories. Reload the page, please.', 'Error!');
        }
    }, [])


    return (
        <div className="container">
            <div className='row'>
                <div className='col my-4'><h2>Cart</h2></div>
            </div>
            <div className="row justify-content-center">
                {
                    products.length > 0 ? 
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price (Un.)</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => {
                                    return <ProductCart product={product} key={product.id} handleRefreshProduct={handleRefreshProduct}/>
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <div className="d-flex total-price">
                                            <div><b>Total:</b></div>
                                            <div><NumericFormat value={total.price} displayType="text" decimalScale={2} fixedDecimalScale prefix={'US$ '} /> <small className="text-muted">(Tax: <NumericFormat value={total.tax} displayType="text" decimalScale={2} fixedDecimalScale prefix={'US$ '} />)</small></div>
                                        </div>    
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>

                        <div className="col-12 my-3" style={{textAlign: 'right'}}>
                            <Button onClick={() => {saveSale()}}>Save sale</Button>
                        </div>
                    </div> : 
                    <div className="text-center">
                        <Alert key="secondary" variant="secondary">
                            Your shopping cart is empty =(
                            <hr/>
                            <small>Click <Link to="/">here</Link> to see the products.</small>
                        </Alert>
                    </div>
                }
            </div>
        </div>
    );
};

export default Cart;