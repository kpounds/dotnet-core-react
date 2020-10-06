import React, { FunctionComponent } from "react"
import { Container } from "semantic-ui-react"
import NavBar from "../components/nav/NavBar"
import { observer } from "mobx-react"
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom"
import HomePage from "../pages/Home/HomePage"
import ActivityDashboard from "../pages/ActivityDashboard/ActivityDashboard"
import ActivityForm from "../pages/ActivityForm/ActivityForm"
import ActivityDetails from "../pages/ActivityDetails/ActivityDetails"
import NotFound from "./NotFound"
import { ToastContainer } from "react-toastify"

const App: FunctionComponent<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="app-container">
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route key={location.key} path={["/createActivity", "/manage/:id"]} component={ActivityForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  )
}

export default withRouter(observer(App))
