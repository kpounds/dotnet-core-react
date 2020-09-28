import React, { useContext, useEffect } from "react"
import { Container } from "semantic-ui-react"
import NavBar from "../components/nav/NavBar"
import ActivityDashboard from "../components/activities/dashboard/ActivityDashboard"
import LoadingComponent from "./LoadingComponent"
import ActivityStore from "../stores/ActivityStore"
import { observer } from "mobx-react"

const App: React.FunctionComponent = () => {
  const { loadingInitial, loadActivities } = useContext(ActivityStore)

  useEffect(() => {
    loadActivities()
  }, [loadActivities])

  if (loadingInitial) {
    return <LoadingComponent content="Loading activities..." />
  }

  return (
    <>
      <NavBar />
      <Container className="app-container">
        <ActivityDashboard />
      </Container>
    </>
  )
}

export default observer(App)
