import { React, useState, useEffect } from "react";
import { Row, Col, Container, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { GoShareAndroid } from "react-icons/go";
import score from "../../assets/svg/Grade_Pertange.svg";
import { ImFilePdf } from "react-icons/im";
import axios from "axios";

function Result() {
  const kids_id = localStorage.getItem("kids_id");
  const exam_id = localStorage.getItem("exam_id");
  const parent_id = localStorage.getItem("parent_id");
  const school_id = localStorage.getItem("school_id");
  const chapter_id = localStorage.getItem("chapter_id");
  const student_name = localStorage.getItem("student_name");
  const name = localStorage.getItem("name");
  const model = localStorage.getItem("modal");
  const questionsLength = localStorage.getItem("questionsLength");
  const questionsanswers = localStorage.getItem("answers.length");
  console.warn(questionsanswers);
  const questionsCount = localStorage.getItem("noq");
  const group_idss = localStorage.getItem("group_idss");

  const token = localStorage.getItem("token");
  const [result, getResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState("");

  useEffect(() => {
  loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}parent-kids-report`;
      const formData = new FormData();
      formData.append("kids_id", kids_id);
      formData.append("school_id", school_id);
      formData.append("exam_id", exam_id);

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
      const demo = response.data;
      console.warn(demo);
      getResult(demo);

      // setPercent(response.data.percent);
      console.warn(percent);

      
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // } finally {
      //   setTimeout(() => {
      //     setLoading(false);
      //   }, 1000);
    }
  };

  return (
   <>
      <div className="heading_content d-flex justify-content-between">

<Link to="/">
  <IoIosArrowBack className="text-light" />
</Link>
<p className="text-light ms-1">Result</p>
<p className="text-light ms-1"></p>

</div>
<div className="App profile Result position-relative">
   
  <Container>
    <Row className="heading_content">
      
    
      <Col md={12} sm={12} xs={12}>
        <div className="score_box">
          <div className="score">
            <img src={score} className="img-fluid" alt="Score" />
            <div className="grade">
            <span>{result.total_percentage}%</span>
              {/* <p>GRADE A</p> */}
            </div>
          </div>
        </div>
      </Col>
    </Row>

    <Row className="bg_image bg-white position-relative z-index-1">
              <Col md={12} sm={12}>
                <div className="stu_name">
                  {/* <span>You are Excellent, </span> */}
                  {result.total_percentage > 60 ? <span>You are Excellent,</span> : <span>You need to improve, </span>}
                  <p>{student_name}</p>
                </div>
              </Col>
              <Col md={12} sm={12}>
                <Card className="result">
                  <div className="result_card">
                    <Table className="mb-0">
                      <tbody>
                        <tr>
                        <th colSpan={'2'} className="head">{model}</th>
                        </tr>
                        <tr>
                          <td><strong>Total Number of Questions</strong></td>
                          <td>{result.totalQuestions}</td>
                          
                        </tr>
                        <tr>
                          <td><strong>Total Marks</strong></td>
                          <td>{result.total_get_marks}</td>
                         
                        </tr>
                        <tr>
                          <td><strong>Correct Answers Marks</strong></td>
                          <td>{result.right}</td>
                         
                        </tr>
                        <tr>
                          <td><strong>Incorrect Answers Marks</strong></td>
                          <td>{result.wrong}</td>
                         
                        </tr>
                        <tr>
                          <td><strong>Minus Marks</strong></td>
                          <td>{result.minus}</td>
                         
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Card>
                <Link to="" className="download">
                  <Button size="lg" className="mybutton"  onClick={() => window.print()}>
                    DOWNLOAD PDF <ImFilePdf className="ms-2 fs-5" />
                  </Button>{" "}
                </Link>{" "}
              </Col>
            </Row>
  </Container>
</div>
   </>
  );
}

export default Result;

