import React from "react"
import { Grid } from "semantic-ui-react"
import { IActivity } from "../../../models/Activity"
import ActivityList from "./ActivityList"

interface IActivityDashboardProps {
  activities: IActivity[]
}

const ActivityDashboard: React.FunctionComponent<IActivityDashboardProps> = ({
  activities,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} />
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
