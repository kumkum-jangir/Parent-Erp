import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Container, Card } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
// import Spinner from "../pages/Spinner";
import axios from "axios";
import loader from '../../assets/images/giphy.gif';
import { Audio } from "react-loader-spinner";
<Audio
  height="80"
  width="80"
  radius="9"
  color="black"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>;

function QuizCourse() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const user_id = localStorage.getItem("user_id");
  const school_id = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  console.log(token);

  const [course, getCourseData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}getCourse`;

      const formData = new FormData();
      formData.append("id", user_id);
      formData.append('school_id', 155);

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
      getCourseData(response.data.data);
      console.log(response);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleClick = (id, name) => {
  //   window.location.href = `/QuizSubject?id=${id}`;
  // };
  const handleClick = (id, name) => {
    // Save id in local storage
    localStorage.setItem('coursid', id);

    // Redirect to the new URL
    window.location.href = `/QuizSubject`;
  };

  return (
    <div className="App profile QuizCourse">
      <Container>
        <Row className="heading_content">
          <Col md={6} sm={6} xs={6}>
            <div className="heading_right">
              <Link to="/Dashboard">
                <IoIosArrowBack className="fs-2 text-light" />
              </Link>
              <p className="text-light ms-1">Play Quiz</p>
            </div>
          </Col>
        </Row>

        {loading ? (
          <div className="img-fluidloder">
            <img
              src={loader}
              alt="quiz"

            />
          </div>
        ) : (
          // <img className="Spinner" src={Spinner}/>
          <Row className="quiz_box gy-3">
            {course && course.length > 0 ?(
              course.map((courses) => (
                <Col md={6} sm={6} xs={6}>
                  <Link onClick={() => handleClick(courses.id)}>
                    <Card className="quiz_box">
                      <div className="quiz_course">
                        <img
                          src={`https://educationerp.a2logicgroup.com/Admin/backend//uploads//School//category/${courses.image}`}
                          alt="quiz"
                          className="img-fluid"
                        />
                        <h5>{courses.name}</h5>
                      </div>
                    </Card>
                  </Link>
                </Col>
            ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center nodataavl Nodata">
                  No data available or something went wrong.
                </td>
              </tr>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default QuizCourse;
