import React, { FunctionComponent, useContext } from "react"
import { Button, Container, Menu } from "semantic-ui-react"
import ActivityStore from "../../stores/ActivityStore"

const NavBar: FunctionComponent = () => {
  const { openCreateForm } = useContext(ActivityStore)
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" className="navbar-logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={openCreateForm} />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar
