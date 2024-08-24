import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import footer from "../../assets/svg/vector_design.svg";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Doubt() {
  const navigate = useNavigate();
  const school_id = localStorage.getItem("school_id");
  const parenttId = localStorage.getItem("user_id");
  const isLoading = useRef(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({

    teacher_id: "",
    school_id: school_id,
    parent_id: parenttId,
    dowt_title: "",
    dowt_descriptions: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        isLoading.current = true;
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}teacher-lists`;
        const formData = new FormData();
        formData.append("school_id", school_id);
        const config = {
          method: "POST",
          url: url,
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios(config);
        setTeachers(response.data.data);
        setSubjects(response.data.data);
        isLoading.current = false;
        setLoading(false);
      } catch (error) {
        isLoading.current = false;
        setLoading(false);
        console.error("Error fetching user data:", error);
      }
    };

    if (!isLoading.current) {
      fetchTeachers();
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };


  const validateForm = () => {
    const errors = {};
    if (!formData.teacher_id) {
      errors.teacher_id = "Please select a teacher.";
    }
    if (!formData.dowt_title.trim()) {
      errors.dowt_title = "Title is required.";
    }
    if (!formData.dowt_descriptions.trim()) {
      errors.dowt_descriptions = "Doubt description is required.";
    }
    return errors;
  };

  const sendDoubtRequest = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}parent-ask-dowts`;
      const formattedData = {
        school_id: formData.school_id,
        teacher_id: formData.teacher_id,
        parent_id: formData.parent_id,
        dowt_title: formData.dowt_title,
        dowt_descriptions: formData.dowt_descriptions,
      };

      const config = {
        method: "post",
        url: url,
        data: formattedData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios(config);
      const data = response.data.data;
      localStorage.setItem("class_id", response.data.class_id);
      console.warn(data);
      Swal.fire({
        icon: "success",
        title: "Sent Request Successful!",
        text: "Your Request has been sent successfully.",
        timer: 1000,
      });
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App profile bg-image-footer">
          <div className="d-flex justify-content-between heading_content background-custum ">
          <Link to="/">
            <IoIosArrowBack className=" text-light" />
          </Link>
          <p className="text-light schoolnotification ms-1">
          Ask Doubts
          </p>
          <p className="text-light schoolnotification ms-1"></p>
        </div>
      <Container>
        
      <Form className="ask_doubt">
                  <Form.Group className="w-100" controlId="teacherSelect">
                    <Form.Label column sm="2">
                      Teacher
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        as="select"
                        className={`border-0 border-bottom form-custum-new ${errors.teacher_id ? "is-invalid" : ""
                          }`}
                        name="teacher_id"
                        value={formData.teacher_id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map((teacher) => {
                          const teacherName = teacher.teacher_name
                            ? teacher.teacher_name.charAt(0).toUpperCase() + teacher.teacher_name.slice(1)
                            : '';
                          const subjectName = teacher.subject_name
                            ? teacher.subject_name.charAt(0).toUpperCase() + teacher.subject_name.slice(1)
                            : '';

                          return (
                            <option
                              key={teacher.teacher_id}
                              value={teacher.teacher_id}
                            >
                              {teacherName}   {subjectName}
                            </option>
                          );
                        })}

                      </Form.Control>
                      {errors.teacher_id && (
                        <div className="invalid-feedback">
                          {errors.teacher_id}
                        </div>
                      )}
                    </Col>
                  </Form.Group>
                  <Form.Group className="w-100" controlId="dowtTitle">
                    <Form.Label column sm="2">
                      Title
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        className={`border-0 border-bottom  form-custum-new ${errors.dowt_title ? "is-invalid" : ""
                          }`}
                        type="text"
                        placeholder=""
                        name="dowt_title"
                        value={formData.dowt_title}
                        onChange={handleInputChange}
                      />
                      {errors.dowt_title && (
                        <div className="invalid-feedback">
                          {errors.dowt_title}
                        </div>
                      )}
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className="w-100"
                    controlId="dowtDescriptions"
                  >
                    <Form.Label column sm="2">
                      Doubt Description
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        className={`border-0 border-bottom  form-custum-new ${errors.dowt_descriptions ? "is-invalid" : ""
                          }`}
                        as="textarea"
                        name="dowt_descriptions"
                        value={formData.dowt_descriptions}
                        onChange={handleInputChange}
                      />
                      {errors.dowt_descriptions && (
                        <div className="invalid-feedback">
                          {errors.dowt_descriptions}
                        </div>
                      )}
                      <Button size="sm" className="mybutton w-100 d-flex justify-content-around" onClick={sendDoubtRequest} disabled={loading}>
                        SEND
                        {loading && <Spinner animation="border" />}
                      </Button>



                    </Col>
                  </Form.Group>
                </Form>
      </Container>
    </div>
  );
}

export default Doubt;



