import { observer } from "mobx-react"
import React, { SyntheticEvent, useContext } from "react"
import { Grid } from "semantic-ui-react"
import { Activity } from "../../../models/Activity"
import ActivityStore from "../../../stores/ActivityStore"
import ActivityDetails from "../details/ActivityDetails"
import ActivityForm from "../form/ActivityForm"
import ActivityList from "./ActivityList"

interface IActivityDashboardProps {
  setEditMode: (editMode: boolean) => void
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void
  submitting: boolean
  target: string
}

const ActivityDashboard: React.FunctionComponent<IActivityDashboardProps> = ({
  setEditMode,
  deleteActivity,
  submitting,
  target,
}) => {
  const { editMode, selectedActivity } = useContext(ActivityStore)
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList deleteActivity={deleteActivity} submitting={submitting} target={target} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm key={selectedActivity?.id ?? 0} setEditMode={setEditMode} initialFormState={selectedActivity} />
        )}
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
