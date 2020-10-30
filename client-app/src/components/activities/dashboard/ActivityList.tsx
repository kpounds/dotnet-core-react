import { observer } from "mobx-react"
import React, { Fragment, FunctionComponent, useContext } from "react"
import { Item, Label } from "semantic-ui-react"
import { RootStoreContext } from "../../../stores/RootStore"
import ActivityListItem from "./ActivityListItem"

const ActivityList: FunctionComponent = () => {
  const rootStore = useContext(RootStoreContext)
  const { activitiesByDate } = rootStore.activityStore
  return (
    <>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Item.Group divided>
            {activities.map((activity) => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </>
  )
}

export default observer(ActivityList)
