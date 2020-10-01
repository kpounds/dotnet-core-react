import { observer } from "mobx-react"
import React from "react"
import { Grid } from "semantic-ui-react"
import ActivityList from "./ActivityList"

const ActivityDashboard: React.FunctionComponent = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
