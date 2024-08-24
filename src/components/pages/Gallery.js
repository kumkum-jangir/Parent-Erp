import React from "react";
import { Row, Col, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import schoolImg from "../../assets/images/school_img.jpg";

function Gallery() {
  return (
    <div className="App profile gallery">
      <Container>
        <Row className="heading_content">
          <Col md={6} sm={6} xs={6}>
            <div className="heading_right">
              <Link to="/Dashboard">
                <IoIosArrowBack className="fs-2 text-light" />
              </Link>
              <p className="text-light ms-1">School Gallery</p>
            </div>
          </Col>
        </Row>

        <div className="round_bg">
          <Row className="gy-3">
            <Col md={6} sm={4} xs={6}>
              <div className="images">
                <img src={schoolImg} alt="Gallery_img" className="img-fluid"/>
              </div>
            </Col>
            <Col md={6} sm={4} xs={6}>
              <div className="images">
                <img src={schoolImg} alt="Gallery_img" className="img-fluid"/>
              </div>
            </Col>
            <Col md={6} sm={4} xs={6}>
              <div className="images">
                <img src={schoolImg} alt="Gallery_img" className="img-fluid"/>
              </div>
            </Col>
            <Col md={6} sm={4} xs={6}>
              <div className="images">
                <img src={schoolImg} alt="Gallery_img" className="img-fluid"/>
              </div>
            </Col>
            <Col md={6} sm={4} xs={6}>
              <div className="images">
                <img src={schoolImg} alt="Gallery_img" className="img-fluid"/>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Gallery;
