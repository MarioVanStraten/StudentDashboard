import React from 'react'
import SideBar from '../components/SideBar'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import RatingFilter from '../components/FilterButtons'

export default function Student({ graphData, students, filterRatings, sortDataByType, match }) {    
    const currentStudent = students.find(student => student.UID === parseInt(match.params.id))
   
    return (
        <React.Fragment>
            <div className='side-bar'>
                <SideBar students={ students } />
            </div>
            <div className='container'>
                <h1>{currentStudent.name}</h1>
                <div className='chart-group'>
                    <BarChart graphData={ graphData } />
                    <RatingFilter filterRatings={ filterRatings } sortDataByType={ sortDataByType } />
                    <LineChart graphData={ graphData } />
                </div>
            </div>
        </React.Fragment>
    )
}
