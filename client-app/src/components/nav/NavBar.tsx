import React from "react"
import { Button, Container, Menu } from "semantic-ui-react"

const NavBar: React.FunctionComponent = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" className="navbar-logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar
