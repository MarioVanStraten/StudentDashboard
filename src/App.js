import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './style/App.css';

/// VIEWS
import Home from './views/Home'
import Students from './views/Students'

/// COMPONENTS
import Navigation from './components/Navigation'

/// DATA
import Assignments from './database/assignments'
import Evaluations from './database/evaluations'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        students: Students,
        assignments: Assignments,
        evaluations: Evaluations
    }
  }

  render(){

    // calc array avg
    const calculateAverage = (array) => {
      let sum = array.reduce((previous, current) => current += previous)
      let avg = Math.round((sum / array.length) * 100) / 100
      return avg
    }

    // Calc avg difficulty per assignment
    const averageOfDifficultyPerAssignment = (assignmentID) => {
      const allEvaluationsByAssignmentID = this.state.evaluations.filter(evaluation => evaluation.assignment === assignmentID)
      const getAllDiffGrades = allEvaluationsByAssignmentID.map(item => item.difficulty)
      const averageAllDiffGrades = calculateAverage(getAllDiffGrades)
      return averageAllDiffGrades
    }

    // Calc avg enjoyment per assignment
    const averageOfEnjoyPerAssignment = (assignmentID) => {
      const allEvaluationsByAssignmentID = this.state.evaluations.filter(evaluation => evaluation.assignment === assignmentID)
      const getAllEnjoyGrades = allEvaluationsByAssignmentID.map(item => item.enjoy)
      const averageAllEnjoyGrades = calculateAverage(getAllEnjoyGrades)
      return averageAllEnjoyGrades
    }

    // Break up assignmentlist in to parts
    const paginate = (array, size) => {
      const paginationBlocks = []
      let index = 0
      while (index < array.length) {
        paginationBlocks.push(array.slice(index, size + index))
        index += size
      }
      return paginationBlocks
    }

    const assignmentsPerPage = 20
    const pagination = paginate(this.state.assignments,assignmentsPerPage)

    /// Build object for graph data
    const allAssignments = pagination[0].map(assignment => {
      const difficultyRatingAvg = averageOfDifficultyPerAssignment(assignment.UID)
      const enjoyRatingAvg = averageOfEnjoyPerAssignment(assignment.UID)
      const grapgData = {id: assignment.UID, assignment: assignment.code, diffRateAvg: difficultyRatingAvg, enjoyRateAvg: enjoyRatingAvg}
      return grapgData
    })

    return (
      <BrowserRouter>
        <header>
          <Navigation />
        </header>
        <main>
          <Switch>
            <Route path='/' exact render={(props) => <Home {...props} graphData={ allAssignments } /> } />
            <Route path='/students' render={(props) => <Students {...props} /> } />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

export default App;
