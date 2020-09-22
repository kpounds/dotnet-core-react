import React, { useEffect, useState } from "react"
import axios from "axios"
import { Header, Icon, Item, List } from "semantic-ui-react"
import { IActivity } from "../models/Activity"

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
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {activities.map((activity) => (
          <Item key={activity.id}>{activity.title}</Item>
        ))}
      </List>
    </div>
  )
}

export default App
