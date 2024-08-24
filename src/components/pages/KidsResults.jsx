import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Row, Col, Container, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import loader from "../../assets/images/giphy.gif";
import imageproifle from "../../assets/images/imageproifle.jpg";
import profile_image from "../../assets/images/imageproifle.jpg";

import nodata from "../../assets/images/nodata.png";

function KidsResults() {
  const school_id = localStorage.getItem("school_id");
  const parent_id = localStorage.getItem("user_id");
  const kids_id = localStorage.getItem("kids_id");
  const token = localStorage.getItem("token");
  const [kids, setKids] = useState([]);
  const isLoading = useRef(false);
  const [loading, setLoading] = useState(false);
  const [image, setimage] = useState([]);

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
      const completeImageUrl = response.data.student_profile;
      const kidsData = response.data.data;
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

  const handleClick = (id, st_class_id, student_name) => {
    localStorage.setItem('kids_id', id);
    localStorage.setItem('student_class_id', st_class_id);
    localStorage.setItem('student_name', student_name);
    window.location.href = "/KidsResultsTable";
  };

  const capitalizeWords = (str) => {
    if (!str) return ''; // return an empty string if str is undefined or null
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };
  return (
    <div className="App Attendance holiday">
      <div className="heading_content d-flex align-items-center justify-content-between">

        <Link to="/" className=" d-flex align-items-center">
          <IoIosArrowBack className="text-light" />
        </Link>
        <p className="text-light ms-1">   Kids Result Information</p>
        <p className="text-light ms-1"></p>

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
                                <Link to="/KidsResultsTable">
                                  {/* <img
                                    src={`${image}/${kid.profile_image}`}
                                    alt="imageproifle"
                                  /> */}
                                  {kid.profile_image == null ? (
                                    <img className="teacher-profileee" src={profile_image} alt="Teacher Profile" />


                                  ) : (
                                    <img className="teacher-profileee" src={`${image}/${kid.profile_image}`} alt="Teacher Profile" />


                                  )}
                                </Link>
                              </div>
                              <Link onClick={() => handleClick(kid && kid.kids_id, kid.student_class_id, kid.student_name)}>
                                <div className="student_name">
                                  <h4 className="mb-0">
                                    {/* {kid && kid.student_name} */}

                                    <h4 className="mb-0">
                                      {kid && capitalizeWords(kid.student_name)}
                                      <span>Verified</span>
                                    </h4>
                                    {/* <span>Verfied</span> */}
                                  </h4>
                                </div>
                              </Link>
                            </div>
                            {/* <div className="contactnumber">
                              <h5 className="mb-0 d-flex">
                                {kid && kid.student_mobile}
                              </h5>
                            </div> */}
                          </div>
                          <div className="d-flex justify-content-between bg-blue_custum">
                            <div className="contactnumber">
                              <h5 className="mb-0 d-flex">
                                <span>Gender : </span>
                                {kid && kid.student_gender}
                              </h5>
                            </div>
                            <div className="contactnumber">
                              <h5 className="mb-0 d-flex">
                                <span>Class : </span>
                                {kid && kid.student_class_name}
                              </h5>
                            </div>

                            <div className="contactnumber">
                              <Link onClick={() => handleClick(kid && kid.kids_id, kid.student_class_id, kid.student_name)}>
                                <h5 className="mb-0 d-flex"><span>View Result</span><strong>{kid && kid.student_due_fee}</strong></h5>
                              </Link>
                            </div>
                            {/* <div className="contactnumber">
                              <h5 className="mb-0 d-flex"><span>Due Fess : </span><strong>{kid && kid.student_due_fee}</strong></h5>
                            </div> */}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                        <div className="text-center nodataavl Nodata1">
                          <img src={nodata} alt="nodata" width={50} />
                        </div>
                      </div>
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

export default KidsResults;
