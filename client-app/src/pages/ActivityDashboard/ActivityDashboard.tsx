import { observer } from "mobx-react"
import React, { useContext, useEffect } from "react"
import { Grid } from "semantic-ui-react"
import LoadingComponent from "../../layout/LoadingComponent"
import ActivityList from "../../components/activities/dashboard/ActivityList"
import { RootStoreContext } from "../../stores/RootStore"

const ActivityDashboard: React.FunctionComponent = () => {
  const rootStore = useContext(RootStoreContext)
  const { loadingInitial, loadActivities } = rootStore.activityStore

  useEffect(() => {
    loadActivities()
  }, [loadActivities])

  if (loadingInitial) {
    return <LoadingComponent content="Loading activities..." />
  }
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
