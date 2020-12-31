import { observer } from "mobx-react"
import React, { FunctionComponent, useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react"
import { RootStoreContext } from "../../stores/RootStore"

const NavBar: FunctionComponent = () => {
  const rootStore = useContext(RootStoreContext)
  const { user, logout } = rootStore.userStore
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img src="/assets/logo.png" alt="logo" className="navbar-logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item as={NavLink} to="/createActivity">
          <Button positive content="Create Activity" />
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={user.image || "/assets/user.png"} />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/profile/${user.username}`} text="My profile" icon="user" />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  )
}

export default observer(NavBar)
