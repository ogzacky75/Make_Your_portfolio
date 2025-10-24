import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () =>{
    return(
        <nav className = "navbar">
            <div className='nav-container'>
                <Link to = "/" className='nav-logo'>
                    Make Your Portfolio
                
                </Link>
                <ul className='nav-links'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/explore">Templates</Link></li>
                    <li><Link to="/find">Search</Link></li>
                </ul>
            </div>
        </nav>
    )
}