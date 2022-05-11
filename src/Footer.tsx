import {Navbar, Container, Nav} from 'react-bootstrap'

const Footer = () => {
  return  <Navbar bg="dark" variant="dark" fixed="bottom">
  <Container>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/about">О словаре</Nav.Link>
        <Navbar.Text>
          <span>В соцсетях: </span>
          <a href="/">VK</a>
        </Navbar.Text>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
}

export { Footer }
