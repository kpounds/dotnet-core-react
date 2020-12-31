import { format } from "date-fns"
import { observer } from "mobx-react"
import React, { FunctionComponent, useContext } from "react"
import { Link } from "react-router-dom"
import { Segment, Image, Button, Header, Item } from "semantic-ui-react"
import { Activity } from "../../../models/Activity"
import { RootStoreContext } from "../../../stores/RootStore"

const activityImageStyle = {
  filter: "brightness(30%)",
}

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
}

const ActivityDetailsHeader: FunctionComponent<{ activity: Activity }> = ({ activity }) => {
  const rootStore = useContext(RootStoreContext)
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore
  const host = activity.attendees.filter((x) => x.isHost)[0]
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size="huge" content={activity.title} style={{ color: "white" }} />
                <p>{format(activity.date, "eeee do MMMM")}</p>
                <p>
                  Hosted by{" "}
                  <Link to={`/profile/${host.username}`}>
                    <strong>Bob</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <Button color="orange" floated="right" as={Link} to={`/manage/${activity.id}`}>
            Manage Event
          </Button>
        ) : activity.isGoing ? (
          <Button loading={loading} onClick={cancelAttendance}>
            Cancel attendance
          </Button>
        ) : (
          <Button loading={loading} color="teal" onClick={attendActivity}>
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  )
}

export default observer(ActivityDetailsHeader)
