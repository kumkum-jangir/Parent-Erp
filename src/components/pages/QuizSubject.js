import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Container, Card } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
// import quiz from "../../assets/images/quiz.webp";
import axios from "axios";
import loader from '../../assets/images/giphy.gif';


// getting id from course
// const url = new URL(window.location.href);
// const course = url.searchParams.get("id");

// alert(course)
function QuizList() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const user_id = localStorage.getItem("user_id");
  const coursid = localStorage.getItem("coursid");
  const school_id = localStorage.getItem("school_id");
  
  const token = localStorage.getItem("token");
  const [users, setstudentCoures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}getSubject`;

      const formData = new FormData();
      // formData.append("id", user_id);
      formData.append("category_id", coursid);
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
      const demo = response.data.data;
      console.warn(demo);
      setstudentCoures(demo);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  const handleClick = (id, coursid) => {
    localStorage.setItem('subid', id);
    window.location.href = `/QuizList`;
  };

  return (
    <div className="App profile QuizCourse">
      <Container>
        <Row className="heading_content">
          <Col md={6} sm={6} xs={6}>
            <div className="heading_right">
              <Link to="/QuizCourse">
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
        <Row className="quiz_box gy-3">
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <Col key={index} md={6} sm={6} xs={6}>
                {/* {/ <Link to="/QuizList"> /} */}
                <Link onClick={() => handleClick(user.id)}>
                  <Card className="quiz_box">
                    <div className="quiz_course">
                      <img
                        src={`https://educationerp.a2logicgroup.com/Admin/backend/uploads/School/category/${user.image}`}
                        alt="quiz"
                        className="img-fluid"
                      />
                      <h5>{user.name}</h5>
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

export default QuizList;
