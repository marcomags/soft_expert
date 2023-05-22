import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from "./../logo.png";
import api from "./../service/api";
import { NumericFormat } from 'react-number-format';
import { NotificationManager } from 'react-notifications';
import {BsFillCartPlusFill} from "react-icons/bs";

const ProductCard = (props) => {
    
    const AddCard = (product) => {

        api.post("cart/create.php",{
            'product_name':product.name, 
            'product_price':product.price, 
            'category_name':product.category_name, 
            'category_tax':product.category_tax,
            'product_id':product.id,
            'session_id':sessionStorage.getItem('session_id')
        }).then((response) => {
            if(response.data.status === 'success'){
                NotificationManager.success(response.data.message, 'Success!');
            }
            else{
                NotificationManager.error(response.data.message, 'Error!');
            }
        })
        .catch((err) => {
            NotificationManager.error('Oops! Unable save product on cart. Try again.', 'Error');    
        });
    }

    return(
        <Card style={{ width: '18rem' }} className="m-2">
            <Card.Img variant="top" src={logo} style={{opacity:0.3}}/>
            <Card.Body>
                <Card.Title>{props.product.name}</Card.Title>
                <Card.Text className="text-muted">{props.product.category_name}</Card.Text>
                <Card.Text className="card-price"><NumericFormat value={props.product.price} displayType="text" decimalScale={2} fixedDecimalScale prefix={'US$ '} /></Card.Text>
                <Button variant="primary" onClick={() => AddCard(props.product)}>Add to cart <BsFillCartPlusFill/></Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;