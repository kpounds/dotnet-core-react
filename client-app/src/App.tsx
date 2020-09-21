import React, { useEffect, useState } from "react"
import "./App.css"
import { Value } from "./models/Value"
import axios from "axios"
import { Header, Icon, Item, List } from "semantic-ui-react"

const App: React.FunctionComponent = () => {
  const [values, setValues] = useState<Value[]>([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/values").then((response) => {
      setValues(response.data)
    })
  }, [])
  return (
    <div>
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {values.map((value) => (
          <Item key={value.id}>{value.name}</Item>
        ))}
      </List>
    </div>
  )
}

export default App
