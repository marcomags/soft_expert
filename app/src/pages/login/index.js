import React, { useReducer, useState } from 'react';
import api from "./../../service/api";
import { NotificationManager } from 'react-notifications';
import {Form, Button} from 'react-bootstrap';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const Login = () => {

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    
    const handleSubmit = event => {
        event.preventDefault();

        //Set indicator loading
        setSubmitting(true);
        
        //Submit to API
        api
        .post("login", formData)
            .then((response) => {
                if(response.data.status === 'success'){
                    //If success, set localStorage logged to true
                    localStorage.setItem('logged', true);
                    event.target.reset();

                    //Refresh page (redirect)
                    window.location.reload(false);
                }
                else{
                    //If error, set localStorage logged to false
                    localStorage.setItem('logged', false);
                    NotificationManager.error(response.data.message, 'Error!');
                }

                //Stop indicator loading
                setSubmitting(false);
            })
            .catch((err) => {
                NotificationManager.error('Oops! Unable login. Try again.', 'Error');
                
                //Stop indicator loading
                setSubmitting(false);
            });
    }

    //Set form data
    const handleChange = event => {
        setFormData({
        name: event.target.name,
        value: event.target.value,
        });
    }
    
    return (
        <div className="container">
            <div className='row'>
                <div className='col'><h2>Login</h2></div>
            </div>
            <div className='row'>
                <div className='col'>
                <hr></hr>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>

                <Form onSubmit={handleSubmit}>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                            type="email" 
                            id="username"
                            name="username"
                            onChange={handleChange}
                            placeholder="Username" />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            id="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Password" />
                        </Form.Group>
                    </div>
                    <Button variant="secondary" type="submit">Submit</Button>
                    {submitting && (
                    <span><small> Submitting...</small></span>
                    )}
                </Form>

                </div>
            </div>
        </div>
    );
};

export default Login;