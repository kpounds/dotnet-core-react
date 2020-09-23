import React, { FunctionComponent } from "react"
import { Button, Container, Menu } from "semantic-ui-react"

interface INavBarProps {
  openCreateForm: () => void
}

const NavBar: FunctionComponent<INavBarProps> = ({ openCreateForm }) => {
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
