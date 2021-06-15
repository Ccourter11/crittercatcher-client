import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    return (
        
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Critter Catcher</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/"></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/"></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/logout">Log Out</Link>
            </li>
            
        </ul>
        
        
    )
}