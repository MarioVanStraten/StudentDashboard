import React from 'react'
import ListRow from './ListRow'

export default function StudentList({ students }) {
    return (
        <ul className='list'>
            { students.map(student => <ListRow key={ student.UID } id={ student.UID } name={ student.name } />) }
        </ul>
    )
}
