import { React, useEffect, useState, useRef } from "react";
import { Row, Col, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profile_image from "../../assets/images/imageproifle.jpg";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { PiGenderNeuterBold } from "react-icons/pi";
import { BsCalendar2Date } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdDriveFileRenameOutline } from "react-icons/md";




function Profilenew() {

  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const school_id = localStorage.getItem("school_id");
  const isLoading = useRef(false);
  const [imge, setImage] = useState("")
  const [profilee, setprofilee] = useState("")

  console.warn(token);
  // alert(token)
  const [getuserdata, setdata] = useState([]);
  const [getparentdata, setParentData] = useState([]);

  useEffect(() => {
    if (!isLoading.current) {
      loadUser();
    }
  }, []);

  const loadUser = async () => {
    try {
      isLoading.current = true;
      const url = `${process.env.REACT_APP_API_URL}parent-Profile`;
      const formData = new FormData();
      formData.append('id', user_id);
      formData.append('school_id', school_id);

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
      console.warn(response)
      setdata(response.data.parentsData);

      const setparentsData = (response.data.parentsData)
      console.warn(setparentsData);
      setParentData(setparentsData);
      // setstudentData(setstudentData);

      // const resp = await axios(config);
      // setdata(resp.data.studentData);
      // console.log(resp);

      const completeImageUrl = `${response.data.url}/${response.data.parentsData.profile}`;
      const profilee = response.data.parentsData.profile;
      setprofilee  (profilee);
      
      setImage(completeImageUrl);
      isLoading.current = false;
    } catch (error) {
      isLoading.current = false;
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  const capitalizeWords = (str) => {
    if (!str) return ''; // return an empty string if str is undefined or null
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  // Inside your component's render method or JSX


  return (
    <div className="App profile">

      <div className="heading_content d-flex justify-content-between">

        <Link to="/">
          <IoIosArrowBack className="text-light" />
        </Link>
        <p className="text-light ms-1">My Profile</p>
        <p className="text-light ms-1"></p>

      </div>
      <div>
        <div className="  ">
          <div className="d-flex align-items-center profile_design">
            <div className="imageprofile1">
              {/* <img src={imge} alt="Student" /> */}

              {profilee === null ? (
                <img className="teacher-profileee" src={profile_image} alt="Student" />
              ) : (
                <img className="teacher-profileee" src={imge} alt="Student" />
              )}

            </div>
            {/* <div className="profiledeaitlsstudent">
              <h3>{getuserdata && capitalizeWords(getuserdata.name)}</h3>
               <p>{getuserdata && getuserdata.email}</p>
            </div> */}
          </div>
        </div>
        <div className="round_bg profile_content">
          <Container>
            <Form className="profile_form">
              <Row>



                <Col md={12} xs={12}>
                  <Form.Group
                    className="mb-3 "
                  >

                    <Col sm="12" className="position-relative">

                      <MdDriveFileRenameOutline className="icon_set" />
                      <Form.Control
                        type="mail"
                        placeholder={getuserdata && capitalizeWords(getuserdata.name)}

                        className="border-0 border-bottom form-details-sign-in"
                      />
                    </Col>
                  </Form.Group>
                </Col>



                <Col md={12} xs={12}>
                  <Form.Group
                    className="mb-3 "
                  >

                    <Col sm="12" className="position-relative">
                      <IoMdMail className="icon_set" />
                      <Form.Control
                        type="mail"
                        placeholder={getuserdata && getuserdata.email}
                        className="border-0 border-bottom form-details-sign-in"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col md={12} xs={12}>
                  <Form.Group
                    className="mb-3 "
                  >

                    <Col sm="12" className="position-relative">
                      <FaLock className="icon_set" />

                      <Form.Control
                        type="text"
                        placeholder={getuserdata && getuserdata.phone}
                        className="border-0 border-bottom form-details-sign-in"
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col md={12} xs={12}>
                  <Form.Group
                    className="mb-3 "
                  >

                    <Col sm="12" className="position-relative">
                      <PiGenderNeuterBold className="icon_set" />

                      <Form.Control
                        type="text"
                        placeholder={getparentdata && getparentdata.gender}
                        className="border-0 border-bottom form-details-sign-in"
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col md={12} xs={12}>
                  <Form.Group
                    className="mb-3 "
                  >

                    <Col sm="12" className="position-relative">
                      <BsCalendar2Date className="icon_set" />

                      <Form.Control
                        type="text"
                        placeholder={new Date(getparentdata.dob).toLocaleDateString()}
                        readOnly
                        className="border-0 border-bottom form-details-sign-in"
                      />
                    </Col>
                  </Form.Group>
                </Col>

                {/* <Col md={6} xs={12}>
                  <Form.Group
                    className="mb-3 "
                  >

                    <Col sm="12" className="position-relative">
                      <FaLocationDot className="icon_set" />

                      <Form.Control
                        type="text"
                        placeholder={getparentdata && getparentdata.address}
                        readOnly
                        className="border-0 border-bottom form-details-sign-in"
                      />
                    </Col>
                  </Form.Group>
                </Col> */}


                <Col md={12} xs={12}>
                  <Form.Group className="mb-3">
                    <Col sm="12" className="position-relative">
                      <FaLocationDot className="icon_set" />
                      <Form.Control
                        as="textarea"
                        rows={3} // Adjust the number of rows as needed
                        placeholder={getparentdata && getparentdata.address}
                        readOnly
                        className="border-0 border-bottom form-details-sign-in"
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Profilenew;
