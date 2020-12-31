import React from "react"
import { Grid } from "semantic-ui-react"
import ProfileHeader from "../../components/profiles/ProfileHeader"

const ProfilePage = () => {
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader />
      </Grid.Column>
    </Grid>
  )
}

export default ProfilePage
