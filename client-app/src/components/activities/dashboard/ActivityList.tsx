import { observer } from "mobx-react"
import React, { Fragment, FunctionComponent, useContext } from "react"
import { Item, Label, Segment } from "semantic-ui-react"
import ActivityStore from "../../../stores/ActivityStore"
import ActivityListItem from "./ActivityListItem"

const ActivityList: FunctionComponent = () => {
  const { activitiesByDate } = useContext(ActivityStore)
  return (
    <>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Segment clearing>
            <Item.Group divided>
              {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  )
}

export default observer(ActivityList)
