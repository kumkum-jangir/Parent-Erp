import {React, useEffect, useState} from "react";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck,FaLock  } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {

  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  console.warn(token);
  // alert(token)
  const [getuserdata, setdata] = useState([]);
  const [getstudentdata, setStudentData]= useState([]);

  useEffect(() => {
    loadUser();
  }, []); 

  const loadUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}getStudentProfile`;

      const formData = new FormData();
      formData.append('id', user_id);
      formData.append('school_id', 150);

      const config = {
        method: 'post',
        url: url,
        data: formData,
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios(config);
      setdata(response.data.data);

      const setstudentData = (response.data.studentData)
      console.warn(setstudentData);
      setStudentData(setstudentData);
      // setstudentData(setstudentData);

      // const resp = await axios(config);
      // setdata(resp.data.studentData);
      // console.log(resp);
      

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="App profile">
     
      <Container>
      
        <Row className="heading_content">
          <Col md={6} sm={6} xs={6}>
            <div className="heading_right">
              <Link to="/dashboard">
                <IoIosArrowBack className="fs-2 text-light" />
              </Link>
              <p className="text-light ms-1">My Profile</p>
            </div>
          </Col>
          <Col md={6} sm={6} xs={6}>
            <div className="d-flex justify-content-end">
              <span className="session">
                <FaCheck className="me-1" /> Done
              </span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12} sm={12}>
            <div className="round_bg">
              <Container>
                <Row>
                  <Col md={12} sm={12}>
                    <Card className="stu_profile">
                      <div className="d-flex">
                        <div className="dp">
                      </div>
                        <div className="profile_detail">
                          <h3>{getstudentdata && getstudentdata.name}</h3>
                          <p>Class XI-B | Roll no: 04</p>
                        </div>
                      </div>
                      <div>
                        {/* <CiCamera className="fs-2" /> */}
                        {/* <img className="dp" src={`https://educationerp.a2logicgroup.com/Admin/public\\backend\\uploads\\Student\\booking_reg_image/${getuserdata.image}`} alt={""}/> */}
                      </div>
                    </Card>
                  </Col>

                  <Col md={12} xs={12}>
                    <Form className="profile_form">
                      <Row>
                      <Col md={6} xs={6}>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label column sm="2">
                        Adhar No
                        </Form.Label>
                        <Col sm="12" className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder="Enter Adhar No"
                            className="border-0 border-bottom"
                          />
                          <FaLock className="lock"/>
                        </Col>
                      </Form.Group>
                      </Col>
                      <Col md={6} xs={6}>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label column sm="2">
                        Academic Year
                        </Form.Label>
                        <Col sm="12" className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder="2020-2021"
                            className="border-0 border-bottom"
                          />
                          <FaLock className="lock"/>
                        </Col>
                      </Form.Group>
                      </Col>

                      <Col md={6} xs={6}>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label column sm="2">
                        Admission For
                        </Form.Label>
                        <Col sm="12" className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder={getstudentdata && getstudentdata.admission_for}
                            className="border-0 border-bottom"
                          />
                          <FaLock className="lock"/>
                        </Col>
                      </Form.Group>
                      </Col>

                      <Col md={6} xs={6}>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label column sm="2">
                        Admission Type
                        </Form.Label>
                        <Col sm="12" className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder={getstudentdata && getstudentdata.admission_type}
                            className="border-0 border-bottom"
                          />
                          <FaLock className="lock"/>
                        </Col>
                      </Form.Group>
                      </Col>

                      <Col md={6} xs={6}>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label column sm="2">
                        Date of Admission
                        </Form.Label>
                        <Col sm="12" className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder="Date of Admission"
                            className="border-0 border-bottom"
                          />
                          <FaLock className="lock"/>
                        </Col>
                      </Form.Group>
                      </Col>

                      <Col md={6} xs={6}>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label column sm="2">
                        Date of Birth
                        </Form.Label>
                        <Col sm="12" className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder={getstudentdata && getstudentdata.dob}
                            className="border-0 border-bottom"
                          />
                          <FaLock className="lock"/>
                        </Col>
                      </Form.Group>
                      </Col>

                      <Col md={6} xs={12}>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label column sm="2">
                        Teacher Mail ID
                        </Form.Label>
                        <Col sm="12" className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder={getstudentdata && getstudentdata.teacher_email}
                            className="border-0 border-bottom"
                          />
                          <FaLock className="lock"/>
                        </Col>
                      </Form.Group>
                      </Col>

                      <Col md={6} xs={12}>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label column sm="2">
                        Teacher Name
                        </Form.Label>
                        <Col sm="12" className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder={getstudentdata && getstudentdata.teacher_name}
                            className="border-0 border-bottom"
                          />
                          <FaLock className="lock"/>
                        </Col>
                      </Form.Group>
                      </Col>

                      <Col md={6} xs={12}>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label column sm="2">
                        Teacher Mobile No.
                        </Form.Label>
                        <Col sm="12" className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder={getstudentdata && getstudentdata.mobile_number}
                            className="border-0 border-bottom"
                          />
                          <FaLock className="lock"/>
                        </Col>
                      </Form.Group>
                      </Col>

                      <Col md={6} xs={12}>
                      <Form.Group
                        className="mb-3"
                      >
                        <Form.Label column sm="2">
                        Parmanent Add.
                        </Form.Label>
                        <Col sm="12" className="position-relative">
                          <Form.Control
                            type="text"
                            placeholder={getstudentdata && getstudentdata.residential_address}
                            className="border-0 border-bottom"
                          />
                          <FaLock className="lock"/>
                        </Col>
                      </Form.Group>
                      </Col>
                      </Row>
                    </Form>
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

export default Profile;
