import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetailsSlice';
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [users, setusers] = useState({})
    const dispacth = useDispatch()
    const navigate = useNavigate()

    const getUserData = (e) => {

        setusers({ ...users, [e.target.name]: e.target.value })
        console.log(users)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(users)
        dispacth(createUser(users))
        navigate('/read')
    }





    return (
        <Form className='w-50 d-flex flex-column mx-auto mt-5' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="name"

                    required
                    onChange={getUserData}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={getUserData}

                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Age</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter age"
                    name="age"
                    onChange={getUserData}

                    required
                />
            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Check label="Male" name='gender' value={'male'} type="radio" onChange={getUserData} required />


            </Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicPassword">
                <Form.Check label="Female" name='gender' value={'female'} onChange={getUserData} type="radio" required />


            </Form.Group>





            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
    );
};

export default Create;
