import React, { FunctionComponent } from "react"
import { Link } from "react-router-dom"
import { Button, Item, Label } from "semantic-ui-react"
import { Activity } from "../../../models/Activity"

const ActivityListItem: FunctionComponent<{ activity: Activity }> = ({ activity }) => {
  return (
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
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default ActivityListItem
