import React, { FormEvent, FunctionComponent, useContext, useEffect, useState } from "react"
import { Button, Form, Segment } from "semantic-ui-react"
import { Activity } from "../../../models/Activity"
import { v4 as uuid } from "uuid"
import ActivityStore from "../../../stores/ActivityStore"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router-dom"
import { IRouteParams } from "../details/ActivityDetails"

const ActivityForm: FunctionComponent<RouteComponentProps<IRouteParams>> = ({ history, match }) => {
  const {
    createActivity,
    editActivity,
    submitting,
    cancelEditForm,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = useContext(ActivityStore)

  const [activity, setActivity] = useState<Activity>(new Activity())

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      const newActivity = { ...activity, id: uuid() }
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`)
      })
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`)
      })
    }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    setActivity({ ...activity, [name]: value })
  }

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        initialFormState && setActivity(initialFormState)
      })
    }
    return () => {
      clearActivity()
    }
  }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id.length])

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
        <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange} />
        <Button floated="right" positive type="submit" content="Submit" loading={submitting} />
        <Button floated="right" type="button" content="Cancel" onClick={cancelEditForm} />
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm)
