import React from "react"
import { Grid } from "semantic-ui-react"
import { Activity } from "../../../models/Activity"
import ActivityDetails from "../details/ActivityDetails"
import ActivityForm from "../form/ActivityForm"
import ActivityList from "./ActivityList"

interface IActivityDashboardProps {
  activities: Activity[]
  selectActivity: (id: string) => void
  selectedActivity: Activity | null
  setSelectedActivity: (activity: Activity | null) => void
  editMode: boolean
  setEditMode: (editMode: boolean) => void
  createActivity: (activity: Activity) => void
  editActivity: (activity: Activity) => void
}

const ActivityDashboard: React.FunctionComponent<IActivityDashboardProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  setSelectedActivity,
  editMode,
  setEditMode,
  createActivity,
  editActivity,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            setEditMode={setEditMode}
            initialFormState={selectedActivity}
            createActivity={createActivity}
            editActivity={editActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
