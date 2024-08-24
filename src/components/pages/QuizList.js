import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Container, Card } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import loader from '../../assets/images/giphy.gif';

const url = new URL(window.location.href);
const chapter1 = url.searchParams.get("id");

const url1 = new URL(window.location.href);
const course = url1.searchParams.get("course");

// alert(course);
function QuizList() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const user_id = localStorage.getItem("user_id");
  const coursid = localStorage.getItem("coursid");
  const sub_id = localStorage.getItem("subid");
  // const school_id = localStorage.getItem("155");

  const token = localStorage.getItem("token");
  const [studentChapter, setStudentChapter] = useState([]);
  const [loading, setLoading] = useState(true);

  // localStorage.setItem('id', 'user_id');
  // localStorage.setItem('subjectId', 'chapter');
  // localStorage.setItem('courseId', 'course');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}get_chapter`;

      const formData = new FormData();
      formData.append("id", user_id);
      formData.append("subjectId", sub_id);
      formData.append("courseId", coursid);
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
      setStudentChapter(demo);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleClick = (id,) => {
    localStorage.setItem('chapter_id', id);
    alert(id)
    window.location.href = `/QuizModel`;
  };

  return (
    <div className="App profile Quizlist">
      <Container>
        <Row className="heading_content">
          <Col md={6} sm={6} xs={6}>
            <div className="heading_right">
              <Link to="/QuizSubject">
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
        <Row className="quiz_List gy-3">
          {studentChapter && studentChapter.length > 0 ?(
            studentChapter.map((chapter, index) => (
              <Col key={index} md={12} sm={12} xs={12}>
                <Link>
                <Card onClick={() => handleClick(chapter.id)} className="list">
                  <div className="quiz_name">
                    <h6>{chapter.name}</h6>
                    <p>No of Questions : 20</p>
                    <span>Time : 30 m</span>
                    <span>{chapter.description}</span>
                  </div>
                  <div className="quiz_btn">
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
          {/* ) : (
            <tr>
              <td colSpan="7" className='text-center nodataavl tezt-dangar'>No data available or something went wrong.</td>
            </tr>
          )} */}
          
        </Row>
         )}
      </Container>
    </div>
  );
}

export default QuizList;
