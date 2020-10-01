import { observer } from "mobx-react"
import React, { FunctionComponent, useContext } from "react"
import { Link } from "react-router-dom"
import { Item, Button, Label, Segment } from "semantic-ui-react"
import ActivityStore from "../../../stores/ActivityStore"

const ActivityList: FunctionComponent = () => {
  const { activitiesByDate, deleteActivity, submitting, target } = useContext(ActivityStore)
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
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
                <Button floated="right" content="View" color="blue" as={Link} to={`/activities/${activity.id}`} />
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

export default observer(ActivityList)
