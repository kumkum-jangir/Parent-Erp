import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { GoClock } from "react-icons/go";

function Datesheet() {
  return (
    <>
    <div className="App profile Datesheet">
      <Container>
        <Row className="heading_content">
          <Col md={6} sm={6} xs={6}>
            <div className="heading_right">
              <Link to="/Dashboard">
                <IoIosArrowBack className="fs-2 text-light" />
              </Link>
              <p className="text-light ms-1">Datesheet</p>
            </div>
          </Col>
          
        </Row>
        <Row>
          <Col md={12} sm={12}>
            <div className="round_bg">
              <Container>
                <Row>
                  <Col md={12} sm={12}>
                    <div className="sheet">
                      <div className="date_sheet">
                        <div className="date">
                          <p>11</p>
                          <span>JAN</span>
                        </div>
                        <div className="border_second">
                          <div className="subject">
                            <p>Science</p>
                            <span>Monday</span>
                          </div>
                          <div className="time">
                            <GoClock className="me-2" />
                            09:00 AM
                          </div>
                        </div>
                      </div>
                      <div className="date_sheet">
                        <div className="date">
                          <p>13</p>
                          <span>JAN</span>
                        </div>
                        <div className="border_second">
                          <div className="subject">
                            <p>English</p>
                            <span>Wednesday</span>
                          </div>
                          <div className="time">
                            <GoClock className="me-2" />
                            09:00 AM
                          </div>
                        </div>
                      </div>
                      <div className="date_sheet">
                        <div className="date">
                          <p>15</p>
                          <span>JAN</span>
                        </div>
                        <div className="border_second">
                          <div className="subject">
                            <p>Hindi</p>
                            <span>Friday</span>
                          </div>
                          <div className="time">
                            <GoClock className="me-2" />
                            09:00 AM
                          </div>
                        </div>
                      </div>
                      <div className="date_sheet">
                        <div className="date">
                          <p>18</p>
                          <span>JAN</span>
                        </div>
                        <div className="border_second">
                          <div className="subject">
                            <p>Math</p>
                            <span>Monday</span>
                          </div>
                          <div className="time">
                            <GoClock className="me-2" />
                            09:00 AM
                          </div>
                        </div>
                      </div>
                      <div className="date_sheet">
                        <div className="date">
                          <p>21</p>
                          <span>JAN</span>
                        </div>
                        <div className="border_second">
                          <div className="subject">
                            <p>Social Study</p>
                            <span>Wednesday</span>
                          </div>
                          <div className="time">
                            <GoClock className="me-2" />
                            09:00 AM
                          </div>
                        </div>
                      </div>
                      <div className="date_sheet">
                        <div className="date">
                          <p>22</p>
                          <span>JAN</span>
                        </div>
                        <div className="border_second">
                          <div className="subject">
                            <p>Drawing</p>
                            <span>Friday</span>
                          </div>
                          <div className="time">
                            <GoClock className="me-2" />
                            09:00 AM
                          </div>
                        </div>
                      </div>
                      <div className="date_sheet">
                        <div className="date">
                          <p>23</p>
                          <span>JAN</span>
                        </div>
                        <div className="border_second">
                          <div className="subject">
                            <p>Computer</p>
                            <span>Monday</span>
                          </div>
                          <div className="time">
                            <GoClock className="me-2" />
                            09:00 AM
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <div className="bottom_bg"></div>
    </>
  );
}

export default Datesheet;
