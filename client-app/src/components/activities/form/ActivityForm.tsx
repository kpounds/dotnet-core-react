import React, { FormEvent, FunctionComponent, useContext, useEffect, useState } from "react"
import { Button, Form, Grid, Segment } from "semantic-ui-react"
import { Activity } from "../../../models/Activity"
import { v4 as uuid } from "uuid"
import ActivityStore from "../../../stores/ActivityStore"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router-dom"
import { IRouteParams } from "../details/ActivityDetails"
import { Form as FinalForm, Field } from "react-final-form"
import TextInput from "../../common/form/TextInput"
import TextAreaInput from "../../common/form/TextAreaInput"
import SelectInput from "../../common/form/SelectInput"
import { category } from "../../common/options/CategoryOptions"
import DateInput from "../../common/form/DateInput"
import { IActivityFormValues } from "../../../models/ActivityFormValues"
import { combineDateAndTime } from "../../../utilities/common"
import { act } from "react-dom/test-utils"

const ActivityForm: FunctionComponent<RouteComponentProps<IRouteParams>> = ({ history, match }) => {
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = useContext(ActivityStore)

  const [activity, setActivity] = useState<IActivityFormValues>({ ...new Activity(), time: undefined })

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     const newActivity = { ...activity, id: uuid() }
  //     createActivity(newActivity).then(() => {
  //       history.push(`/activities/${newActivity.id}`)
  //     })
  //   } else {
  //     editActivity(activity).then(() => {
  //       history.push(`/activities/${activity.id}`)
  //     })
  //   }
  // }

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date!, values.time!)
    const { date, time, ...activity } = values
    activity.date = dateAndTime
    console.log(activity)
  }

  useEffect(() => {
    if (match.params.id && activity.id) {
      loadActivity(match.params.id).then(() => {
        initialFormState && setActivity(initialFormState)
      })
    }
    return () => {
      clearActivity()
    }
  }, [loadActivity, clearActivity, match.params.id, initialFormState, activity.id])

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
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
                <Button floated="right" positive type="submit" content="Submit" loading={submitting} />
                <Button floated="right" type="button" content="Cancel" onClick={() => history.push("/activities")} />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityForm)
