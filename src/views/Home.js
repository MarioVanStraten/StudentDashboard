import React from 'react'
import SideBar from '../components/SideBar'
import BarChart from '../components/BarChart'
import RatingFilter from '../components/FilterButtons'

export default function Home({ graphData, students, filterRatings, sortDataByType }) {
    return (
        <React.Fragment>
            <div className='side-bar'>
                <SideBar students={ students } />
            </div>
            <div className='container'>
                <h1>Class of march 2020</h1>
                <div className='chart-group'>
                    <BarChart graphData={ graphData } />
                    <RatingFilter filterRatings={ filterRatings } sortDataByType={ sortDataByType } />
                </div>  
            </div>
        </React.Fragment>
    )
}