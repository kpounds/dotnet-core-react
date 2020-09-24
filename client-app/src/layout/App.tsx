import React, { SyntheticEvent, useContext, useEffect, useState } from "react"
import { Container } from "semantic-ui-react"
import { Activity } from "../models/Activity"
import NavBar from "../components/nav/NavBar"
import ActivityDashboard from "../components/activities/dashboard/ActivityDashboard"
import ActivitiesApi from "../api/ActivitiesApi"
import LoadingComponent from "./LoadingComponent"
import ActivityStore from "../stores/ActivityStore"
import { observer } from "mobx-react"

const App: React.FunctionComponent = () => {
  const { loadingInitial, loadActivities } = useContext(ActivityStore)
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [target, setTarget] = useState("")

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
    loadActivities()
  }, [loadActivities])

  if (loadingInitial) {
    return <LoadingComponent content="Loading activities..." />
  }

  return (
    <>
      <NavBar />
      <Container className="app-container">
        <ActivityDashboard
          setSelectedActivity={setSelectedActivity}
          setEditMode={setEditMode}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </>
  )
}

export default observer(App)
