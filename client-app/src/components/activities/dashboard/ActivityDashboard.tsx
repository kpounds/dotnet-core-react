import React, { SyntheticEvent } from "react"
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
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void
  submitting: boolean
  target: string
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
  deleteActivity,
  submitting,
  target,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
          target={target}
        />
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
            key={selectedActivity?.id ?? 0}
            setEditMode={setEditMode}
            initialFormState={selectedActivity}
            createActivity={createActivity}
            editActivity={editActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
