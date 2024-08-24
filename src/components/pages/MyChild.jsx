import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Row, Col, Container, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import loader from "../../assets/images/giphy.gif";
import imageproifle from "../../assets/images/imageproifle.jpg";
import profile_image from "../../assets/images/imageproifle.jpg";

function MyChild() {
  const school_id = localStorage.getItem("school_id");
  const parent_id = localStorage.getItem("user_id");
  const student_class_id = localStorage.getItem("student_class_id");
  const section_id = localStorage.getItem("section_id");
  const token = localStorage.getItem("token");
  const [kids, setKids] = useState([]);
  const isLoading = useRef(false);
  const [loading, setLoading] = useState(false);
  const [image, setimage] = useState([])


  const getkids = async () => {
    try {
      isLoading.current = true;
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}parents-kids`;
      const formData = new FormData();
      formData.append("school_id", school_id);
      formData.append("parent_id", parent_id);
      const config = {
        method: "post",
        url: url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios(config);
      const completeImageUrl = response.data.student_profile

      const kidsData = response.data.data;
      // localStorage.setItem(kids_id, response.data.data.kids_id);
      setKids(kidsData);
      setimage(completeImageUrl);
      isLoading.current(false);
      setLoading(false);
    } catch (error) {
      isLoading.current = false;
      setLoading(false);
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      isLoading.current = false;
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!isLoading.current) {
      getkids();
    }
  }, []);

  const handleClick = (id, st_class_id, section_id) => {
    localStorage.setItem('kids_id', id);
    localStorage.setItem('student_class_id', st_class_id);
    localStorage.setItem('section_id', section_id);
    window.location.href = "/Fees";
  };

  const handleAttendClick = (id, st_class_id,section_id) => {
    localStorage.setItem('kids_id', id);
    localStorage.setItem('student_class_id', st_class_id);
    localStorage.setItem('section_id', section_id);
    window.location.href = "/Attendance";
  };

  const capitalizeWords = (str) => {
    if (!str) return ''; // return an empty string if str is undefined or null
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };



  return (
    <div className="App Attendance holiday">
      <div className="d-flex justify-content-between heading_content background-custum ">
        <Link to="/">
          <IoIosArrowBack className=" text-light" />
        </Link>
        <p className="text-light schoolnotification ms-1">
          Kids Information
        </p>
        <p className="text-light schoolnotification ms-1"></p>
      </div>

      <Container>


        {loading ? (
          <div className="img-fluidloder">
            <img src={loader} alt="Loading..." />
          </div>
        ) : (
          <Row>
            <Col md={12} sm={12} className="pb-5">

              <div className="round_bg1">
                <Row className=" two_option pl-0">
                  <Col md={12} sm={12}>
                    {kids && kids.length > 0 ? (
                      kids.map((kid, index) => (
                        <div className="studentprofile">
                          <div className="d-flex justify-content-between padding_side">
                            <div className="d-flex align-items-center">
                              <div className="imgagestduent">
                                {/* <img  src={`${image}/${kid.profile_image}`}  alt="imageproifle" /> */}
                                {kid.profile_image == null ? (
                                  <img className="teacher-profileee" src={profile_image} alt="Teacher Profile" />


                                ) : (
                                  <img className="teacher-profileee" src={`${image}/${kid.profile_image}`} alt="Teacher Profile" />

                                )}

                              </div>
                              <div className="student_name">
                                <h4 className="mb-0">
                                  {kid && capitalizeWords(kid.student_name)}
                                  <span>Verified</span>
                                </h4>
                              </div>
                            </div>
                            <div className="contactnumber">
                              <Link onClick={() => handleAttendClick(kid && kid.kids_id, kid.student_class_id,kid.section_id)}>
                                <h5 className="mb-0 d-flex"><span>Attendance</span></h5>
                              </Link>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between bg-blue_custum">
                            <div className="contactnumber">
                              <h5 className="mb-0 d-flex"><span>Gender : </span>{kid && kid.student_gender}</h5>
                            </div>
                            <div className="contactnumber">
                              <h5 className="mb-0 d-flex"><span>Class : </span>{kid && kid.student_class_name}</h5>
                            </div>
                            <div className="contactnumber">
                              <Link onClick={() => handleClick(kid && kid.kids_id, kid.student_class_id,kid.section_id)}>
                                <h5 className="mb-0 d-flex"><span>Due Fees</span><strong>{kid && kid.student_due_fee}</strong></h5>
                              </Link>
                            </div>
                          </div>
                        </div>

                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center nodataavl Nodata1">
                          No data available or something went wrong.
                        </td>
                      </tr>
                    )}

                  </Col>
                </Row>

              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default MyChild;
