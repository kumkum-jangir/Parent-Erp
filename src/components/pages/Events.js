import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { GoClock } from "react-icons/go";

function Events() {
  return (
    <div className="App profile Event">
      <Container>
        <Row className="heading_content">
          <Col md={6} sm={12} xs={12}>
            <div className="heading_right">
              <Link to="/Dashboard">
                <IoIosArrowBack className="fs-2 text-light" />
              </Link>
              <p className="text-light ms-1">Events & Programs</p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12} sm={12}>
            <div className="round_bg">
              <Container>
                <Row>
                  <Col md={12} sm={12}>
                  <Link to="/EventDetail">
                    <Card className="event">
                      <h6>Sleepover Night</h6>
                      <div className="event-box">
                        <div className="dp"></div>
                        <div className="event_detail">
                          <span className="date">
                            <GoClock />
                            06 Jan 21, 09:00 AM
                          </span>
                          <p>
                            A sleepover is a great treat for kids. Many schools
                            use such an event as the culminating activity of the
                            school year.
                          </p>
                        </div>
                      </div>
                    </Card>
                    </Link>
                    <Link to="/EventDetail">
                    <Card className="event">
                      <h6>Fishing Tournament</h6>
                      <div className="event-box">
                        <div className="dp"></div>
                        <div className="event_detail">
                          <span className="date">
                            <GoClock />
                            06 Jan 21, 09:00 AM
                          </span>
                          <p>
                            A sleepover is a great treat for kids. Many schools
                            use such an event as the culminating activity of the
                            school year.
                          </p>
                        </div>
                      </div>
                    </Card>
                    </Link>
                    <Link to="/EventDetail">
                    <Card className="event">
                      <h6>Rhyme Time: A Night of Poetry</h6>
                      <div className="event-box">
                        <div className="dp"></div>
                        <div className="event_detail">
                          <span className="date"> <GoClock />06 Jan 21, 09:00 AM</span>
                          <p>
                            April is also National Poetry Month. Now there is a
                            great theme for a fun family night! Combine poetry
                            readings by students...
                          </p>
                        </div>
                      </div>
                    </Card>
                    </Link>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Events;
