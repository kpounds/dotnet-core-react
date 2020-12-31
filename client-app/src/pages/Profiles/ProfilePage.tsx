import { observer } from "mobx-react"
import React, { FunctionComponent, useContext, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import ProfileContent from "../../components/profiles/ProfileContent"
import ProfileHeader from "../../components/profiles/ProfileHeader"
import LoadingComponent from "../../layout/LoadingComponent"
import { RootStoreContext } from "../../stores/RootStore"

interface RouteParams {
  username: string
}

interface IProfilePageProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: FunctionComponent<IProfilePageProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext)
  const { loadingProfile, profile, loadProfile } = rootStore.profileStore

  useEffect(() => {
    loadProfile(match.params.username)
  }, [loadProfile, match])

  if (loadingProfile) {
    return <LoadingComponent content="Loading profile..." />
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile!} />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ProfilePage)
