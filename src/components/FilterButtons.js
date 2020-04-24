import React from 'react'

export default function RatingFilter({ filterRatings, sortDataByType }) {
    return (
        <div className='filters'>
            <span>Show:</span>
            <div className='filter-button-group'>
                <button onClick={ filterRatings } value='both'>Both</button>
                <button onClick={ filterRatings } value='difficulty'>Difficulty</button>
                <button onClick={ filterRatings } value='enjoyment'>Enjoyment</button> 
            </div>
            <span>Sort by:</span>
            <div className='filter-button-group'>
                <button onClick={ sortDataByType } value='id'>Assignment</button>
                <button onClick={ sortDataByType } value='diffRateAvg'>Difficulty</button>
                <button onClick={ sortDataByType } value='enjoyRateAvg'>Enjoyment</button>    
            </div>
        </div>
    )
}
