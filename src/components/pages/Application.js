import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Form, Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";

function Application() {
  const schoolId = localStorage.getItem("school_id");
  const user_id = localStorage.getItem("user_id");
  const student_class_id = localStorage.getItem("student_class_id");
  const teacher_id = localStorage.getItem("teacher_id");

  const isLoading = useRef(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    teacher_id: teacher_id,
    school_id: schoolId,
    parent_id: user_id,
    leave_message: "",
    start_date: new Date(),
    end_date: new Date(),
    class_id: student_class_id,
  });

  const [leaves, setLeaves] = useState([]);
  const [toggledStudentIndex, setToggledStudentIndex] = useState(null);
  const token = localStorage.getItem("token");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        isLoading.current = true;

        const apiUrl = `${process.env.REACT_APP_API_URL}parent-see-kids-applied-leaves`;

        const formattedData = {
          ...formData,
          start_date: formData.start_date.toISOString().split("T")[0],
          end_date: formData.end_date.toISOString().split("T")[0],
        };

        const response = await axios.post(apiUrl, formattedData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        localStorage.setItem("total_applied_leave", response.data.total_applied_leave);
        setLeaves(response.data.data);
        isLoading.current = false;
        setLoading(false);
      } catch (error) {
        isLoading.current = false;
        setLoading(false);
        console.error("Error fetching leave data:", error);
      }
    };
    if (!isLoading.current) {
      fetchLeaves();
    }
  }, []);

  const handleToggle = (index) => {
    setToggledStudentIndex(toggledStudentIndex === index ? null : index);
  };

  return (
    <div className="App profile bg-bottom-image1">
      <div className="d-flex justify-content-between heading_content background-custum">
        <Link to="/">
          <IoIosArrowBack className=" text-white" />
        </Link>
        <p className="text-white schoolnotification ms-1">Leave Application</p>
        <p className="text-white schoolnotification ms-1"></p>
      </div>
      <Container style={{ paddingTop: "15px" }}>
        {leaves.length > 0 ? (
          leaves.map((leave, index) => (
            <div key={index} className="mb-3">
              <Button
                variant="light"
                className="w-100 text-start"
                onClick={() => handleToggle(index)}
              >
                <h5>{index + 1}. {leave.student_name.charAt(0).toUpperCase() + leave.student_name.slice(1)}</h5>
              </Button>
              <Collapse in={toggledStudentIndex === index}>
                <div>
                  <Form className="ask_doubt">
                    <Form.Group className="w-100" controlId="formTeacherId">
                      <Form.Label column sm="2">
                        <p className="text-dark form_heading">Class Teacher</p>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          as="select"
                          className="border-0 border-bottom"
                          name="teacher_id"
                          value={formData.teacher_id}
                          onChange={handleInputChange}
                        >
                          <option value="">
                            {leave.teacher_name ? leave.teacher_name.charAt(0).toUpperCase() + leave.teacher_name.slice(1) : ""}
                          </option>
                          <option key={leave.teacher_id} value={leave.teacher_id}>
                            {leave.teacher_id ? leave.teacher_id.charAt(0).toUpperCase() + leave.teacher_id.slice(1) : ""}
                          </option>
                        </Form.Control>
                      </Col>
                    </Form.Group>

                    <Form.Group className="w-100" controlId="formClassName">
                      <Form.Label column sm="2">
                        <p className="text-dark form_heading">Class</p>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="text"
                          placeholder={leave.class_name}
                          className="border-0 border-bottom"
                          name="class_name"
                          value={leave.class_name}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group className="w-100" controlId="formLeaveMessage">
                      <Form.Label column sm="2">
                        <p className="text-dark form_heading">Application Title</p>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="text"
                          placeholder={leave.leave_message}
                          className="border-0 border-bottom"
                          name="leave_message"
                          value={formData.leave_message}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>

                    <Row>
                      <Col xs={6}>
                        <Form.Group className="w-100" controlId="formStartDate">
                          <Form.Label column sm="2">
                            <p className="text-dark form_heading">Start Date</p>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={leave.start_date}
                            className="border-0 border-bottom"
                            name="start_date"
                            value={leave.start_date}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={6}>
                        <Form.Group className="w-100" controlId="formEndDate">
                          <Form.Label column sm="2">
                            <p className="text-dark form_heading">End Date</p>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={leave.end_date}
                            className="border-0 border-bottom"
                            name="end_date"
                            value={leave.end_date}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="w-100" controlId="formAppliedDate">
                      <Form.Label column sm="2">
                        <p className="text-dark form_heading">Applied Date</p>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="text"
                          placeholder={leave.applied_date}
                          className="border-0 border-bottom"
                          name="applied_date"
                          value={leave.applied_date}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Form.Group>

                    <div className="border-bottom w-100 bbr"></div>
                  </Form>
                </div>
              </Collapse>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>No data found</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Application;
