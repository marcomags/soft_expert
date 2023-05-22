import React from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const Forbidden = () => {
return (
        <div className="container">
            <div className="row">
                <div className="col text-center mt-5">
                    <Alert key="danger" variant="danger">
                        You are not logged in. Please click the button below to enter the dashboard
                        <hr/>
                        <small>
                            <Button variant="outline-danger" to="/" as={Link}>Sign in</Button>
                        </small>
                    </Alert>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;