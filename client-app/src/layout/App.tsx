import React, { useEffect, useState } from "react"
import axios from "axios"
import { Container, List } from "semantic-ui-react"
import { IActivity } from "../models/Activity"
import NavBar from "../components/nav/NavBar"

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
        <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </Container>
    </>
  )
}

export default App
