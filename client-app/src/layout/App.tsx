import React, { useEffect, useState } from "react"
import axios from "axios"
import { Container } from "semantic-ui-react"
import { IActivity } from "../models/Activity"
import NavBar from "../components/nav/NavBar"
import ActivityDashboard from "../components/activities/dashboard/ActivityDashboard"

const App: React.FunctionComponent = () => {
  const [activities, setActivities] = useState<IActivity[]>([])

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data)
      })
  }, [])

  return (
    <>
      <NavBar />
      <Container className="app-container">
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  )
}

export default App
