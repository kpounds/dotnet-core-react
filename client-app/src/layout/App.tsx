import React, { useEffect, useState } from "react"
import { Container } from "semantic-ui-react"
import { Activity } from "../models/Activity"
import NavBar from "../components/nav/NavBar"
import ActivityDashboard from "../components/activities/dashboard/ActivityDashboard"
import ActivitiesApi from "../api/ActivitiesApi"

const App: React.FunctionComponent = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [editMode, setEditMode] = useState(false)

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id)!)
    setEditMode(false)
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }

  const handleCreateActivity = (activity: Activity) => {
    ActivitiesApi.createActivity(activity).then(() => {
      setActivities([...activities, activity])
      setSelectedActivity(activity)
      setEditMode(false)
    })
  }

  const handleEditActivity = (activity: Activity) => {
    ActivitiesApi.updateActivity(activity).then(() => {
      setActivities([...activities.filter((x) => x.id !== activity.id), activity])
      setSelectedActivity(activity)
      setEditMode(false)
    })
  }

  const handleDeleteActivity = (id: string) => {
    ActivitiesApi.deleteActivity(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)])
    })
  }

  useEffect(() => {
    ActivitiesApi.getActivityList().then((response) => {
      let activities: Activity[] = []
      response.forEach((activity) => {
        activity.date = activity.date.split(".")[0]
        activities.push(activity)
      })
      setActivities(activities)
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
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  )
}

export default App
