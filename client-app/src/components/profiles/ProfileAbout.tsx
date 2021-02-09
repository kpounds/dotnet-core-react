import { observer } from "mobx-react"
import React, { useContext, useState } from "react"
import { Button, Grid, Header, Tab } from "semantic-ui-react"
import { RootStoreContext } from "../../stores/RootStore"
import ProfileEditForm from "./ProfileEditForm"

const ProfileAbout = () => {
  const rootStore = useContext(RootStoreContext)
  const { profile, isCurrentUser } = rootStore.profileStore
  const [editProfileMode, setEditProfileMode] = useState(false)

  if (!profile) {
    return <Tab.Pane>No user profile!</Tab.Pane>
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" image={profile.image} content={`About ${profile.displayName}`} />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editProfileMode ? "Cancel" : "Edit Profile"}
              onClick={() => setEditProfileMode(!editProfileMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editProfileMode ? <ProfileEditForm toggleFormOpen={setEditProfileMode} /> : <>{profile.bio}</>}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
}

export default observer(ProfileAbout)
