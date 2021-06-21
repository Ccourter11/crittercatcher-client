import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { useHistory } from "react-router"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'



export const NavBar = (props) => {

    const history = useHistory()

    return (
        
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Critter Catcher</Navbar.Brand>
            <Nav className="navbar">
        {/* <ul className="navbar"> */}
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Homepage</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/services">Services</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/requests">Request</Link>
            </li>
            
            <Nav className="logout">
            {
                (localStorage.getItem("critter-catcher_token") !== null) ?
                    <li className="nav-item">
                        <Nav.Link className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("critter-catcher_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</Nav.Link>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Nav.Link className="navbar_link" to="/login">Login</Nav.Link>
                        </li>
                        <li className="nav-item">
                            <Nav.Link className="navbar_link" to="/register">Register</Nav.Link>
                        </li>
                    </>
            }    
            </Nav>
        {/* </ul> */}
        </Nav>
       </Navbar> 
      </> 
    )
}

{/* <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    
  </Navbar> */}