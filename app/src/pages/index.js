import React from "react";
import Alert from 'react-bootstrap/Alert';

const Home = () => {
return (
        <div className="container">
            <div className="row">
                <div className="col text-center mt-5">
                    <Alert key="secondary" variant="secondary">
                        Welcome to <b>SE Market</b> dashboard!
                        <hr/>
                        <small>Choose options from the menu above</small>
                    </Alert>
                </div>
            </div>
        </div>
    );
};

export default Home;