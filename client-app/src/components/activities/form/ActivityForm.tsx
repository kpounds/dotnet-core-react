import React, { FunctionComponent } from "react"
import { Button, Form, Segment } from "semantic-ui-react"

interface IActivityFormProps {
  setEditMode: (editMode: boolean) => void
}

const ActivityForm: FunctionComponent<IActivityFormProps> = ({
  setEditMode,
}) => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea rows={2} placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input type="date" placeholder="Date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  )
}

export default ActivityForm
