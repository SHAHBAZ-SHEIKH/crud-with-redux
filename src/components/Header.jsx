import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {userSearch} from '../features/userDetailsSlice'
import { useEffect, useState } from 'react';
function Header() {

  const [search, setSearch] = useState('')

  const alluser = useSelector((state) => state.app.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userSearch(search))
  }, [search])
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">RTK</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link ><Link to="/">CreatePost</Link></Nav.Link>
            <Nav.Link  ><Link to="/read">All Post ({alluser.length})</Link></Nav.Link>
            
          </Nav>
          <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  
                </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;