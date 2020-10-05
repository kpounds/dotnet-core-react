import { observer } from "mobx-react"
import React, { FunctionComponent, useContext, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import LoadingComponent from "../../../layout/LoadingComponent"
import ActivityStore from "../../../stores/ActivityStore"
import ActivityDetailsChat from "./ActivityDetailsChat"
import ActivityDetailsHeader from "./ActivityDetailsHeader"
import ActivityDetailsInfo from "./ActivityDetailsInfo"
import ActivityDetailsSideBar from "./ActivityDetailsSideBar"

export interface IRouteParams {
  id: string
}

const ActivityDetails: FunctionComponent<RouteComponentProps<IRouteParams>> = ({ match }) => {
  const { activity, loadActivity, loadingInitial } = useContext(ActivityStore)

  useEffect(() => {
    loadActivity(match.params.id)
  }, [loadActivity, match.params.id])

  return (
    <>
      {loadingInitial ? (
        <LoadingComponent content="Loading activity..." />
      ) : activity ? (
        <Grid>
          <Grid.Column width={10}>
            <ActivityDetailsHeader activity={activity} />
            <ActivityDetailsInfo activity={activity} />
            <ActivityDetailsChat />
          </Grid.Column>
          <Grid.Column width={6}>
            <ActivityDetailsSideBar />
          </Grid.Column>
        </Grid>
      ) : (
        <h2>Activity not found</h2>
      )}
    </>
  )
}

export default observer(ActivityDetails)
