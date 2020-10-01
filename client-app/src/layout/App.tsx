import React, { FunctionComponent } from "react"
import { Container } from "semantic-ui-react"
import NavBar from "../components/nav/NavBar"
import { observer } from "mobx-react"
import { Route, RouteComponentProps, withRouter } from "react-router-dom"
import HomePage from "../pages/Home/HomePage"
import ActivityDashboard from "../components/activities/dashboard/ActivityDashboard"
import ActivityForm from "../components/activities/form/ActivityForm"
import ActivityDetails from "../components/activities/details/ActivityDetails"

const App: FunctionComponent<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="app-container">
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
            </Container>
          </>
        )}
      />
    </>
  )
}

export default withRouter(observer(App))
