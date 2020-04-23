import React from 'react'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'

export default function Home({ graphData }) {
    return (
        <div>
            <h1>Student Dashboard</h1>
            <BarChart graphData={ graphData }/>
            <LineChart graphData={ graphData }/>
        </div>
    )
}
