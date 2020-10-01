import { observer } from "mobx-react"
import React, { FunctionComponent, useContext, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Button, Card, Image } from "semantic-ui-react"
import LoadingComponent from "../../../layout/LoadingComponent"
import ActivityStore from "../../../stores/ActivityStore"

interface IRouteParams {
  id: string
}

const ActivityDetails: FunctionComponent<RouteComponentProps<IRouteParams>> = ({ match, history }) => {
  const { activity, openEditForm, loadActivity, loadingInitial } = useContext(ActivityStore)

  useEffect(() => {
    loadActivity(match.params.id)
  }, [loadActivity, match.params.id])

  return (
    <>
      {loadingInitial || !activity ? (
        <LoadingComponent content="Loading activity..." />
      ) : (
        <Card fluid>
          <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
              <span>{activity.date}</span>
            </Card.Meta>
            <Card.Description>{activity.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button.Group widths={2}>
              <Button basic color="blue" content="Edit" onClick={() => openEditForm(activity.id)} />
              <Button basic color="grey" content="Back" onClick={() => history.push("/activities")} />
            </Button.Group>
          </Card.Content>
        </Card>
      )}
    </>
  )
}

export default observer(ActivityDetails)
