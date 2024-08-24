import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import supports from "../../assets/svg/support.svg";

function Support() {
  return (
    <div className="App profile Support">
      <Container>
        <Row className="heading_content">
          <Col md={6} sm={6} xs={6}>
            <div className="heading_right">
              <Link to="/Dashboard">
                <IoIosArrowBack className="fs-2 text-light" />
              </Link>
              <p className="text-light ms-1">Support</p>
            </div>
          </Col>
        </Row>

        <div className="round_bg">
          <div className="support_img">
            <img className="img-fluid" src={supports} alt="support" />
            <h5>Get Support</h5>
            <p>
              For any support request regards your orders or deliveries please
              feel free speak with us at below.
            </p>
            <div className="support_down">
              <p className="call">Call us -<Link to="tel:+917838XXXXXX"> +91 7838XXXXXX</Link> </p>
            <span>Mail us - <Link to="mailto:syalfreelance@gmail.com">syalfreelance@gmail.com</Link></span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Support;
