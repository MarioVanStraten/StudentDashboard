import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
        <nav className="navigation">
            <ul className='menu'>
                <Link to='/'>
                    <li className='menu-item'>Home</li>
                </Link>
            </ul>
        </nav>
    )
}
