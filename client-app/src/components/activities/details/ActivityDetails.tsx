import { observer } from "mobx-react"
import React, { FunctionComponent, useContext } from "react"
import { Button, Card, Image } from "semantic-ui-react"
import { Activity } from "../../../models/Activity"
import ActivityStore from "../../../stores/ActivityStore"

interface IActivityDetailsProps {
  setEditMode: (setEditMode: boolean) => void
  setSelectedActivity: (activity: Activity | null) => void
}

const ActivityDetails: FunctionComponent<IActivityDetailsProps> = ({ setEditMode, setSelectedActivity }) => {
  const { selectedActivity: activity } = useContext(ActivityStore)
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" content="Edit" onClick={() => setEditMode(true)} />
          <Button basic color="grey" content="Cancel" onClick={() => setSelectedActivity(null)} />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default observer(ActivityDetails)
