import React, { useEffect, useState } from "react"
import axios from "axios"
import { Container } from "semantic-ui-react"
import { Activity } from "../models/Activity"
import NavBar from "../components/nav/NavBar"
import ActivityDashboard from "../components/activities/dashboard/ActivityDashboard"

const App: React.FunctionComponent = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  )
  const [editMode, setEditMode] = useState(false)

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id)!)
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }

  const handleCreateActivity = (activity: Activity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleEditActivity = (activity: Activity) => {
    setActivities([...activities.filter((x) => x.id !== activity.id), activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data)
      })
  }, [])

  return (
    <>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container className="app-container">
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          setSelectedActivity={setSelectedActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
        />
      </Container>
    </>
  )
}

export default App
