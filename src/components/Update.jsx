import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../features/userDetailsSlice';

const Update = () => {

    const {id} = useParams()
    const { users, loading } = useSelector((state) => state.app)
    const [updateData,setUpdateData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    useEffect(()=>{
        if(id){
            const singleData = users.find((item) => item.id === id)
            setUpdateData(singleData)
        }
    },[])

    console.log("updateData", updateData)

    const newData = (e) => {
        setUpdateData({...updateData,[e.target.name]:e.target.value})
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        dispatch(updateUser(updateData))
        console.log(updateData)
        navigate('/read')
    }

    

  

  

  return (
    <Form className='w-50 d-flex flex-column mx-auto mt-5' onSubmit={handleUpdate}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="name"
          value={updateData && updateData.name}
          
          required
          onChange={newData}
          
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={ updateData && updateData.email}
          
          required
          onChange={newData}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter age"
          name="age"
          value= {updateData && updateData.age}
          onChange={newData}
          
          
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 " controlId="formBasicPassword">
      <Form.Check label="Male" name='gender' onChange={newData} value={'male'} checked={ updateData && updateData.gender === 'male'} type="radio"  required/>
        
        
      </Form.Group>

      <Form.Group className="mb-3 " controlId="formBasicPassword">
      <Form.Check label="Female" name='gender' onChange={newData} value={'female'} checked={ updateData && updateData.gender === 'female'}  type="radio" required/>
        
        
      </Form.Group>

      

      

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default Update;
