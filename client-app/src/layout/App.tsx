import React, { SyntheticEvent, useEffect, useState } from "react"
import { Container } from "semantic-ui-react"
import { Activity } from "../models/Activity"
import NavBar from "../components/nav/NavBar"
import ActivityDashboard from "../components/activities/dashboard/ActivityDashboard"
import ActivitiesApi from "../api/ActivitiesApi"
import LoadingComponent from "./LoadingComponent"

const App: React.FunctionComponent = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [target, setTarget] = useState("")

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id)!)
    setEditMode(false)
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }

  const handleCreateActivity = (activity: Activity) => {
    setSubmitting(true)
    ActivitiesApi.createActivity(activity)
      .then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
      })
      .finally(() => setSubmitting(false))
  }

  const handleEditActivity = (activity: Activity) => {
    setSubmitting(true)
    ActivitiesApi.updateActivity(activity)
      .then(() => {
        setActivities([...activities.filter((x) => x.id !== activity.id), activity])
        setSelectedActivity(activity)
        setEditMode(false)
      })
      .finally(() => setSubmitting(false))
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true)
    setTarget(event.currentTarget.name)
    ActivitiesApi.deleteActivity(id)
      .then(() => {
        setActivities([...activities.filter((x) => x.id !== id)])
      })
      .finally(() => setSubmitting(false))
  }

  useEffect(() => {
    ActivitiesApi.getActivityList()
      .then((response) => {
        let activities: Activity[] = []
        response.forEach((activity) => {
          activity.date = activity.date.split(".")[0]
          activities.push(activity)
        })
        setActivities(activities)
      })
      .then(() => setLoading(false))
  }, [])

  if (loading) {
    return <LoadingComponent content="Loading activities..." />
  }

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
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  )
}

export default App
