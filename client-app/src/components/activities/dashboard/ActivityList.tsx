import React, { FunctionComponent, SyntheticEvent } from "react"
import { Item, Button, Label, Segment } from "semantic-ui-react"
import { Activity } from "../../../models/Activity"

interface IActivityListProps {
  activities: Activity[]
  selectActivity: (id: string) => void
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void
  submitting: boolean
  target: string
}

const ActivityList: FunctionComponent<IActivityListProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target,
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button floated="right" content="View" color="blue" onClick={() => selectActivity(activity.id)} />
                <Button
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={(e) => deleteActivity(e, activity.id)}
                  loading={target === activity.id && submitting}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
}

export default ActivityList
