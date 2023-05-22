import React, { useReducer, useState } from 'react';
import api from "./../../service/api";
import { NotificationManager } from 'react-notifications';
import {Form, Button, InputGroup} from 'react-bootstrap';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

const Create = () => {

  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    //Set indicator loading
    setSubmitting(true);
    
    //Submit to API
    api
    .post("category/create.php", formData)
        .then((response) => {
          if(response.data.status === 'success'){
            NotificationManager.success(response.data.message, 'Success!');
            event.target.reset();
          }
          else{
            NotificationManager.error(response.data.message, 'Error!');
          }
          setSubmitting(false);
        })
        .catch((err) => {
          NotificationManager.error('Oops! Unable save product. Try again.', 'Error');
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
    <div className='container mt-3'>
      <div className='row'>
        <div className='col'><h2>Category</h2><h6 className='subtitle'>Create</h6></div>
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
                <Form.Label>Category name</Form.Label>
                <Form.Control 
                  type="text" 
                  id="name"
                  name="name"
                  onChange={handleChange}
                  placeholder="Category name" />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Tax</Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control 
                    type="number" 
                    id="tax"
                    name="tax"
                    step=".01"
                    onChange={handleChange}
                    placeholder="Tax" />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
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

export default Create;