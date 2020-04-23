import React from "react";
import wincTheme from "./wincTheme";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryGroup
} from "victory";

function BarChart({ graphData }) {
  // console.log(graphData)

  // Bar graph data
  const assignmentRatingAverageWithLabels = graphData.map(assignment => ({
    assignment: assignment.assignment,
    difficultyRating: assignment.diffRateAvg,
    enjoymentRating: assignment.enjoyRateAvg,
    label: `Opdracht ${
      assignment.assignment
    }, difficultyRating: ${assignment.diffRateAvg.toFixed(
      1
    )}, enjoymentRating: ${assignment.enjoyRateAvg.toFixed(1)}`
  }))

  return (
    <>
      <VictoryChart domainPadding={35} theme={wincTheme}>
        <VictoryGroup offset={12}>
          <VictoryBar
            labelComponent={<VictoryTooltip />}
            data={assignmentRatingAverageWithLabels}
            x="assignment"
            y="difficultyRating"
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={assignmentRatingAverageWithLabels.map(
              avg => avg.assignment
            )}
          />
          <VictoryBar
            labelComponent={<VictoryTooltip />}
            data={assignmentRatingAverageWithLabels}
            x="assignment"
            y="enjoymentRating"
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={assignmentRatingAverageWithLabels.map(
              avg => avg.assignment
            )}
          />
        </VictoryGroup>
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={assignmentRatingAverageWithLabels.map(
            avg => avg.assignment
          )}
        />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    </>
    )
  }
  
export default BarChart;
