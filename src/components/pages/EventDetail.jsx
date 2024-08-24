import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { GoClock } from "react-icons/go";

function EventDetail() {
  return (
    <div className="App profile EventDetail">
    <Container>
      <Row className="heading_content">
        <Col md={6} sm={12} xs={12}>
          <div className="heading_right">
            <Link to="/Events">
              <IoIosArrowBack className="fs-2 text-light" />
            </Link>
            <p className="text-light ms-1">Events Detail</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12} sm={12}>
          <div className="round_bg">
            <Container>
              <Row>
                <Col md={12} sm={12}>
                  <div className="event">
                      <span className="date">
                            <GoClock />
                            06 Jan 21, 09:00 AM
                          </span>
                    <h6>Rhyme Time: A Night of Poetry</h6>
                        <p>
                        April is also National Poetry Month. Now there is a great theme for a fun family night! Combine poetry readings by students and adults. Invite guest readers and poets. Sell a book of student poems as a fund-raiser. Display portfolios of students' best poetry. Present your oldest students in a poetry slam competition, like teacher Brenda Dyck staged with her students (see the Education World article, A Poetry Slam Cures Midwinter Blahs). For more ideas for great poetry writing activities, don't miss Education World's special Poetry Month archive.
                        </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default EventDetail