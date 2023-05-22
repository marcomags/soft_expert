import React, { useReducer, useState, useEffect } from 'react';
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
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  //Get the categories
  useEffect(() => {
      async function getCategories () {
        try {
          const categories = await api.get('category/get.php');
          setCategories(categories.data);
        } catch (error) {
          NotificationManager.error('Oops! Unable to load categories. Reload the page, please.', 'Error!');
        }
      }
      getCategories();
  }, []);
  
  //Handle to submit
  const handleSubmit = event => {
    event.preventDefault();

    //Set indicator loading
    setSubmitting(true);
    
    //Submit to API
    api
    .post("product/create.php", formData)
        .then((response) => {
          if(response.data.status === 'success'){
            NotificationManager.success(response.data.message, 'Success!');
            event.target.reset();
          }
          else{
            NotificationManager.error(response.data.message, 'Error!');
          }
          
          //Stop indicator loading
          setSubmitting(false);
        })
        .catch((err) => {
          NotificationManager.error('Oops! Unable save product. Try again.', 'Error');
          
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
    <div className='container mt-3'>
      <div className='row'>
        <div className='col'><h2>Product</h2><h6 className='subtitle'>Create</h6></div>
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
                <Form.Label>Product name</Form.Label>
                <Form.Control 
                  type="text" 
                  id="name"
                  name="name"
                  onChange={handleChange}
                  placeholder="Product name" />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control 
                    type="number" 
                    id="price"
                    name="price"
                    step=".01"
                    onChange={handleChange}
                    placeholder="Price" />
                </InputGroup>
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Select a category" onChange={handleChange} name="category_id" id="category_id">
                  <option value={''}>Choose a category</option>
                  {categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
                </Form.Select>
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