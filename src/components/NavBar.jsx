import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function HomeNavBar() {
  return (
    <>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img alt="" src="/meteo.png" width="30" height="30" className="d-inline-block align-top" /> EpiWeather
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Form inline>
            <Row>
              <Col xs="auto"></Col>
              <Col xs="auto"></Col>
            </Row>
          </Form>
        </Container>
      </Navbar>
    </>
  );
}
