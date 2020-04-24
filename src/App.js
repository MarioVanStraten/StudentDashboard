import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './style/App.css';

/// VIEWS
import Home from './views/Home'
import Students from './views/Students'

/// COMPONENTS
import Navigation from './components/Navigation'

/// DATA
import AssignmentsData from './database/assignments'
import StudentsData from './database/students'
import EvaluationsData from './database/evaluations'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        students: StudentsData,
        assignments: AssignmentsData,
        evaluations: EvaluationsData,
        filterRatings: {
          difficulty: true,
          enjoyment: true
        },
        sorting: {
          type: 'id',
          order: true
        }
    }
  }

  render(){

    // Get data
    const allStudents = this.state.students.map(student => student)
    const allEveluations = this.state.evaluations.map(evaluation => evaluation)

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

    const assignmentsPerPage = 15
    const pagination = paginate(this.state.assignments,assignmentsPerPage)

    /// Build object for graph data
    const allAssignments = pagination[0].map(assignment => {
      let difficultyRatingAvg
      let enjoyRatingAvg
      this.state.filterRatings.difficulty === false ? difficultyRatingAvg = 0 : difficultyRatingAvg = averageOfDifficultyPerAssignment(assignment.UID)
      this.state.filterRatings.enjoyment === false ? enjoyRatingAvg = 0 : enjoyRatingAvg = averageOfEnjoyPerAssignment(assignment.UID)
      const graphData = {id: assignment.UID, assignment: assignment.code, diffRateAvg: difficultyRatingAvg, enjoyRateAvg: enjoyRatingAvg}
      return graphData
    })

    // Funtion for sorting JSON arrays based on given propery
    const sortByProperty = (property,order) => {  
      return function(a,b){
        if(order === true){
          if(a[property] > b[property])  
            return 1;  
          else if(a[property] < b[property])  
              return -1
          return 0;
        } else if(order === false){
          if(a[property] < b[property])  
            return 1;  
          else if(a[property] > b[property])  
              return -1;  
          return 0
        }
      }  
    }

    // Set the sorting state by type, and toggle asc desc
    const sortDataByType = (event) => {
      const newSortType = event.target.value
      let newSortState = {...this.state.sorting}
      let newOrder = newSortState.order
      newSortState.type === newSortType ? newOrder = !newSortState.order : newOrder = newSortState.order
      newSortState = {type: newSortType, order: newOrder}
      this.setState({sorting: newSortState})
    }

    const sortedData = allAssignments.sort(sortByProperty(this.state.sorting.type,this.state.sorting.order))

    // Filter difficult, enjoyment or both
    const filterRatings = (event) => {
      const filterType = event.target.value
      let newFilterState = {...this.state.filterRatings}
      if(filterType === 'difficulty'){
        newFilterState = {difficulty: true, enjoyment: false}
      } else if(filterType === 'enjoyment'){
        newFilterState = {difficulty: false, enjoyment: true}
      } else {
        newFilterState = {difficulty: true, enjoyment: true}
      }
      this.setState({filterRatings: newFilterState})
    }

    return (
      <BrowserRouter>
        <div className='grid'>
          <header>
            <Navigation />
          </header>
          <Switch>
            <Route path='/' exact render={(props) => 
              <Home {...props} 
                graphData={ sortedData } 
                students={ allStudents }
                filterRatings={ filterRatings }
                sortDataByType={ sortDataByType }
              />}
            />
            <Route path='/students/:id' render={(props) => 
              <Students {...props} 
                graphData={ allAssignments } 
                students={ allStudents } 
                filterRatings={ filterRatings }
                sortDataByType={ sortDataByType }
                evaluations={ allEveluations }
              />}
            />
          </Switch>
          <footer>
            <span>&copy; 2020 Winc Academy</span>
          </footer>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
