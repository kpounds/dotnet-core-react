import React, { useContext, useEffect } from "react"
import { Container } from "semantic-ui-react"
import NavBar from "../components/nav/NavBar"
import LoadingComponent from "./LoadingComponent"
import ActivityStore from "../stores/ActivityStore"
import { observer } from "mobx-react"
import { Route } from "react-router-dom"
import HomePage from "../pages/Home/HomePage"
import ActivityDashboard from "../components/activities/dashboard/ActivityDashboard"
import ActivityForm from "../components/activities/form/ActivityForm"

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
        <Route exact path="/" component={HomePage} />
        <Route path="/activities" component={ActivityDashboard} />
        <Route path="/createActivity" component={ActivityForm} />
      </Container>
    </>
  )
}

export default observer(App)
