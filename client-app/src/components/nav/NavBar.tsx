import React, { FunctionComponent } from "react"
import { NavLink } from "react-router-dom"
import { Button, Container, Menu } from "semantic-ui-react"

const NavBar: FunctionComponent = () => {
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
      </Container>
    </Menu>
  )
}

export default NavBar
