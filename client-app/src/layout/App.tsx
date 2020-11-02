import React, { FunctionComponent, useContext, useEffect } from "react"
import { Container } from "semantic-ui-react"
import NavBar from "../components/nav/NavBar"
import { observer } from "mobx-react"
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom"
import HomePage from "../pages/Home/HomePage"
import ActivityDashboard from "../pages/ActivityDashboard/ActivityDashboard"
import ActivityForm from "../pages/ActivityForm/ActivityForm"
import ActivityDetails from "../pages/ActivityDetails/ActivityDetails"
import Login from "../pages/Login/Login"
import NotFound from "./NotFound"
import { ToastContainer } from "react-toastify"
import { RootStoreContext } from "../stores/RootStore"
import LoadingComponent from "./LoadingComponent"

const App: FunctionComponent<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext)
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore
  const { getUser } = rootStore.userStore

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded()
    }
  }, [getUser, token, setAppLoaded])

  if (!appLoaded) {
    return <LoadingComponent content="Loading app..." />
  }

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
                <Route path="/login" component={Login} />
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
