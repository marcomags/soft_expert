import React from "react";
import { NumericFormat } from 'react-number-format';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import {BsFillTrashFill} from "react-icons/bs";
import api from "../service/api";


const ProductCart = (props) => {
    
    const tax_un = props.product.product_price*(props.product.category_tax/100);
    const price_un = props.product.product_price;
    const price = props.product.product_price*props.product.qty
    const tax = price*(props.product.category_tax/100);

    const changeQty = (event, product) => {
        api.post("cart/changeQty.php",{
            'id':product.id,
            'qty':event.target.value
        })
        .then((response) => {
            props.handleRefreshProduct();
        })
    }

    const deleteProduct = (product) => {
        api.post("cart/delete.php",{
            'id':product.id,
        })
        .then((response) => {
            props.handleRefreshProduct();
        })
    }

    return(
        
        <tr>
            <td>{props.product.product_name}<br/><small className="text-muted">{props.product.category_name} (Tax {props.product.category_tax}%)</small></td>
            <td>
                <NumericFormat value={price_un} displayType="text" decimalScale={2} fixedDecimalScale prefix={'US$ '} /><br/>
                <small className="text-muted">Tax: <NumericFormat value={tax_un} displayType="text" decimalScale={2} fixedDecimalScale prefix={'US$ '} /></small>
            </td>
            <td><Form.Control type="number" min="1" onChange={(event) => changeQty(event, props.product)} increment="1" defaultValue={props.product.qty} placeholder="Quantity" style={{width: '60px'}} /></td>
            <td>
                <NumericFormat value={price} displayType="text" decimalScale={2} fixedDecimalScale prefix={'US$ '} /><br/>
                <small className="text-muted">Tax: <NumericFormat value={tax} displayType="text" decimalScale={2} fixedDecimalScale prefix={'US$ '} /></small>
            </td>
            <td className="text-center"><Button onClick={() => deleteProduct(props.product)} variant="danger"><BsFillTrashFill/></Button></td>
        </tr>
    )
}

export default ProductCart;