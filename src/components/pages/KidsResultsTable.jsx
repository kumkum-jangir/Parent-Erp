import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Container, Card } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import loader from "../../assets/images/giphy.gif";

const url = new URL(window.location.href);
const chapter1 = url.searchParams.get("id");

const url1 = new URL(window.location.href);
const course = url1.searchParams.get("course");

// alert(course);
function KidsResultsTable() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const kids_id = localStorage.getItem("kids_id");
  const school_id = localStorage.getItem("school_id");
  // alert(group_idssss);
  const token = localStorage.getItem("token");
  const [studentChapter, setStudentChapter] = useState([]);
  const isLoading = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading.current) {
      loadUser();
    }
  }, []);

  const loadUser = async () => {
    try {
      isLoading.current = true;
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}parent-kids-exam-list`;
      const formData = new FormData();
      formData.append("kids_id", kids_id);
      formData.append("school_id", school_id);

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
      const demo = response.data.kids_exam_lists;
      // alert(demo);
      console.warn(demo);
      setStudentChapter(demo);
      isLoading.current = false;
    } catch (error) {
      isLoading.current = false;
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleClick = (exam_id) => {
    localStorage.setItem("exam_id", exam_id);
    window.location.href = `/Result`;
  };

  return (
    <div className="App profile Quizlist">
      <div className="heading_content d-flex justify-content-between">

<Link to="/" className="d-flex ">
  <IoIosArrowBack className="text-light" />
</Link>
<p className="text-light ms-1">Result Table</p>
<p className="text-light ms-1"></p>

</div>
      <Container>
        
        {loading ? (
          <div className="img-fluidloder">
            <img src={loader} alt="quiz" />
          </div>
        ) : (
          <div className="quiz_List gy-3">
            {studentChapter && studentChapter.length > 0 ? (
              studentChapter.map((chapter) => (
                <Card className=" mt-2">
                  <Card.Body className="p-1">
                  <div className="quiz_name text-start">
                  <div className="d-flex justify-content-between">
                  <h4 className="mb-0 pb-0">{chapter.user_name}</h4>
                  <p className="mb-0 pb-0 text-info">{chapter.modal}</p>
                  </div>
                  <span>Date : {chapter.date} </span>
                  {/* <span>{chapter.description}</span> */}
                </div>
                <div className="quiz_btn1">
                  <Link onClick={() => handleClick(chapter.exam_id)}>
                    <div className="d-flex justify-content-end">
                      <span className="btn_quiz">View Result</span>
                    </div>
                  </Link>
                </div>
                  </Card.Body>
              </Card>
              ))
            ) : (
                <div  className="text-center nodataavl Nodata" style={{color:"black",text:"blod",paddingTop:"20px"}}>
                  You have not attempt any exam.
                </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default KidsResultsTable;
