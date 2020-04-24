import React from 'react'
import { Link }  from 'react-router-dom'


export default function StudentListRow({ id, name }) {
    return (
        <Link to={`/students/${id}`} >
            <li key={id} className='list-row' >
                <span>{name}</span>
            </li>
        </Link>
    )
}
