import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Row,Col,Container } from "react-bootstrap";
import Splash from '../../assets/images/splash.png'

function Home() {
  return (
    <>
      <div className="App">
        <Container>
          <div className="App-header text-center py-5">
          <Link to="/Login">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          </div>
          <Row className="text-center mt-5 pb-5">
            <Col md={12}>
              <img src={Splash} alt="Splash" className="img-fluid"/>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
