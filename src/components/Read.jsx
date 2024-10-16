import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { showUser, deleteUser } from '../features/userDetailsSlice';
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const Read = () => {
    const dispatch = useDispatch()
    const { users, loading, searchData } = useSelector((state) => state.app)
    const [id, setId] = useState()
    const [showpopup, setShowPopup] = useState(false)
    const [radioData, setRadioData] = useState("")

    console.log("id", id)
    console.log("users", users)

    useEffect(() => {
        console.log("read")
        dispatch(showUser())

    }, [])

    const handleClick = (id) => {
        setId(id)
        setShowPopup(true)
    }

    if (loading) {
        return <h1 className='text-center'>Loading</h1>
    }


    return (
        <div>

            <div className='d-flex justify-content-center'>
                <Form.Group className="mb-3 " controlId="formBasicPassword">
                    <Form.Check label="All" name='gender' value={''} type="radio" checked={radioData === ""} onChange={(e) => setRadioData(e.target.value)} required />


                </Form.Group>

                <Form.Group className="mb-3 " controlId="formBasicPassword">
                    <Form.Check label="Male" name='gender' value={'male'} checked={radioData === "male"} onChange={(e) => setRadioData(e.target.value)} type="radio" required />


                </Form.Group>

                <Form.Group className="mb-3 " controlId="formBasicPassword">
                    <Form.Check label="Female" name='gender' value={'female'} checked={radioData === "female"} onChange={(e) => setRadioData(e.target.value)} type="radio" required />


                </Form.Group>
            </div>

            {showpopup && <CustomModal id={id} setShowPopup={setShowPopup} />}
            {users &&
                users.filter((ele) => {
                    if (searchData === "") {
                        return ele
                    }
                    else {
                        return ele.name.toLowerCase().includes(searchData.toLowerCase())
                    }
                }).filter((ele) => {
                    if(radioData ==="male"){
                        return ele.gender === radioData
                    }
                    else if(radioData ==="female"){
                        return ele.gender === radioData
                    }
                    return ele

                })
                    .map((item) => {
                        return (
                            <Card key={item.id} style={{ width: '18rem' }} className='mx-auto mt-5'>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{item.email}</Card.Subtitle>
                                    <Card.Text>
                                        {item.gender}
                                    </Card.Text>
                                    <Card.Link onClick={() => handleClick(item.id)}>View</Card.Link>
                                    <Card.Link ><Link to={`/edit/${item.id}`}>Edit</Link></Card.Link>
                                    <Card.Link onClick={() => dispatch(deleteUser(item.id))}><Link>Delete</Link></Card.Link>
                                </Card.Body>
                            </Card>
                        )
                    })
            }
        </div>
    )
}

export default Read
