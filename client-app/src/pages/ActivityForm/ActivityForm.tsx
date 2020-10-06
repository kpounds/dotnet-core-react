import React, { FunctionComponent, useContext, useEffect, useState } from "react"
import { Button, Form, Grid, Segment } from "semantic-ui-react"
import { v4 as uuid } from "uuid"
import ActivityStore from "../../stores/ActivityStore"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router-dom"
import { IRouteParams } from "../ActivityDetails/ActivityDetails"
import { Form as FinalForm, Field } from "react-final-form"
import TextInput from "../../components/common/form/TextInput"
import TextAreaInput from "../../components/common/form/TextAreaInput"
import SelectInput from "../../components/common/form/SelectInput"
import { category } from "../../components/common/options/CategoryOptions"
import DateInput from "../../components/common/form/DateInput"
import { ActivityFormValues } from "../../models/ActivityFormValues"
import { combineDateAndTime } from "../../utilities/common"

const ActivityForm: FunctionComponent<RouteComponentProps<IRouteParams>> = ({ history, match }) => {
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = useContext(ActivityStore)

  const [activity, setActivity] = useState(new ActivityFormValues())
  const [loading, setLoading] = useState(false)

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date!, values.time!)
    const { date, time, ...activity } = values
    activity.date = dateAndTime
    if (!activity.id) {
      const newActivity = { ...activity, id: uuid() }
      createActivity(newActivity)
    } else {
      editActivity(activity)
    }
  }

  useEffect(() => {
    if (match.params.id) {
      setLoading(true)
      loadActivity(match.params.id)
        .then((activity) => setActivity(new ActivityFormValues(activity)))
        .finally(() => setLoading(false))
    }
  }, [loadActivity, match.params.id])

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field placeholder="Title" value={activity.title} name="title" component={TextInput} />
                <Field
                  placeholder="Description"
                  value={activity.description}
                  name="description"
                  component={TextAreaInput}
                  rows={3}
                />
                <Field
                  placeholder="Category"
                  value={activity.category}
                  name="category"
                  component={SelectInput}
                  options={category}
                />
                <Form.Group widths="equal">
                  <Field placeholder="Date" date={true} value={activity.date} name="date" component={DateInput} />
                  <Field placeholder="Time" time={true} value={activity.date} name="time" component={DateInput} />
                </Form.Group>
                <Field placeholder="City" value={activity.city} name="city" component={TextInput} />
                <Field placeholder="Venue" value={activity.venue} name="venue" component={TextInput} />
                <Button
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  loading={submitting}
                  disabled={loading}
                />
                <Button
                  floated="right"
                  type="button"
                  content="Cancel"
                  disabled={loading}
                  onClick={
                    activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push("/activities")
                  }
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityForm)
