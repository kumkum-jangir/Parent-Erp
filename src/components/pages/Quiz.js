import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Container, Card, Modal, Button } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
// import { IoCloseCircle } from "react-icons/io5";
import Swal from "sweetalert2";
import axios from "axios";
import loader from "../../assets/images/giphy.gif";
import { useNavigate } from "react-router-dom";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";

const url = new URL(window.location.href);
const chapter1 = url.searchParams.get("id");

const url1 = new URL(window.location.href);
const course = url1.searchParams.get("course");

function Quiz() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [showModal, setShowModal] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClose = () => {
    setShowModal(false);
  };

  const user_id = localStorage.getItem("user_id");
  const coursid = localStorage.getItem("coursid");
  const sub_id = localStorage.getItem("subid");
  const chapter_id = localStorage.getItem("chapter_id");
  const model_id = localStorage.getItem("model_id");
  const token = localStorage.getItem("token");

  const [questions, setStudentQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers1, setSubmitAns] = useState("");
  const [answers, setAnswers] = useState(Array(questions.length).fill());
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  // Api For submit Answers

  const submitAnswers = async () => {
    try {
      // if (answers.some(option => option === null)) {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Incomplete Quiz',
      //     text: 'Please select answers for all questions before submitting.',
      //   });
      //   return;
      // }
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}submit-question`;
      const d = {
        user_id: user_id,
        modal_id: model_id,
        category_id: coursid,
        chapter_id: chapter_id,
        subcategory_id: sub_id,
        school_id: 155,
        answerDt: JSON.stringify({ answer_data: answers }),
      };

      // const formData = new FormData();
      // formData.append("user_id", user_id);
      // formData.append("category_id", coursid);
      // formData.append("model_id", model_id);
      // formData.append("subcategory_id", sub_id);
      // formData.append("answerDt", {"answer_data": [{"question_id": "66","answer_id": "5"}]});
      // formData.append("answerDt", JSON.stringify({'answer_data':answers}));

      const config = {
        method: "post",
        url: url,
        data: d,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios(config);
      const data = response.data.data;
      console.warn(data);
      Swal.fire({
        icon: "success",
        title: "Submission Successful!",
        text: "Your answers have been submitted successfully.",
        timer: 2000,
      }).then(() => {
        // Navigate to the Result page
        navigate("/Result");
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  // ApI for getting question list

  const loadUser = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}get-question`;

      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("category_id", coursid);
      formData.append("model_id", model_id);
      formData.append("subcategory_id", sub_id);
      formData.append("chapter_id", chapter_id);
      formData.append("school_id", 155);

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
      setStudentQuestions(demo);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const onSubmit = (id) => {
    submitAnswers();
    localStorage.setItem("answerDt", id);
    window.location.href = `/Result`;
  };

  const handleOptionClick = (selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(updatedAnswers);
    localStorage.setItem("answers", JSON.stringify(updatedAnswers));
    setSelectedOption(selectedOption);
  };

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // const handleNextClick = (question_id) => {
  //   if (currentQuestionIndex < questions.length - 1) {
  //     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  //     localStorage.setItem('answer_id', 0);
  //     localStorage.setItem('question_id', question_id);
  //     // If it's the last question, set isLastQuestion to true
  //     if (currentQuestionIndex === questions.length - 2) {
  //       setIsLastQuestion(true);
  //     }
  //   }
  //   alert(questions.length)
  // };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

      const storedQuestionId = localStorage.getItem("question_id");
      localStorage.setItem("question_id", questions[currentQuestionIndex].id);
      localStorage.setItem("answer_id", 0);

      // If it's the last question, set isLastQuestion to true
      if (currentQuestionIndex === questions.length - 2) {
        setIsLastQuestion(true);
      }
    }
  };

  //how to send id on button click where data comes from api and

  useEffect(() => {
    // Load answers from localStorage when the component mounts
    const storedAnswers = JSON.parse(localStorage.getItem("answers"));
    if (storedAnswers && storedAnswers.length === questions.length) {
      setAnswers(storedAnswers);
    }
  }, [questions.length]);

  return (
    <div className="App profile Quiz">
      <Modal show={showModal} onHide={handleClose} className="instruction">
        <Modal.Header>
          <Modal.Title className="fs-5">Quiz instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="mb-0">
            <li>Total number of questions: 20</li>
            <li>Time allotted: 30 minutes</li>
          </ul>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row className="heading_content">
          <Col md={6} sm={6} xs={6}>
            <div className="heading_right">
              <Link to="/QuizModel">
                <IoIosArrowBack className="fs-2 text-light" />
              </Link>
              <p className="text-light ms-1">Play Quiz</p>
            </div>
          </Col>
          <Col md={6} sm={6} xs={6}>
            <p className="skip">Skip</p>
          </Col>
        </Row>

        <Row>
          <div>
            <div className="timer">
              <div className="remaining_time">
                <span>18 Sec</span>
              </div>
              <LuClock3 className="lock" />
            </div>

            <div className="question">
              <div className="number">
                {questions && questions.length > 0 && (
                  <p>{`Question ${currentQuestionIndex + 1}/${
                    questions.length
                  }`}</p>
                )}
              </div>
              <div className="Total_number">
                <FaUsers className="me-2 fs-6" />
                <span>265</span>
              </div>
            </div>
          </div>
          <Col md={12} sm={12}>
            <div>
              <Container>
                <Row>
                  <Col md="6" sm="6" xs="6">
                    <p onClick={handlePrevClick} className="prev">
                      <AiOutlineDoubleLeft className="chivpre" />
                      Prev
                    </p>
                  </Col>
                  <Col md="6" sm="6" xs="6">
                    <p onClick={handleNextClick} className="next">
                      Next
                      <AiOutlineDoubleRight className="chivpre" />
                    </p>
                  </Col>
                </Row>

                <Row>
                  {questions && questions.length > 0 ? (
                    <Card className="quiz_box">
                      <div className="">
                        <h4>{questions[currentQuestionIndex].title}</h4>
                        {questions[currentQuestionIndex].answer.map(
                          (option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`option ${
                                selectedOption &&
                                selectedOption.question_id ===
                                  option.question_id &&
                                selectedOption.answer_id === option.id
                                  ? "right_option"
                                  : ""
                              }`}
                              onClick={() =>
                                handleOptionClick({
                                  question_id: option.question_id,
                                  answer_id: option.id,
                                })
                              }
                            >
                              <p>{option.answer}</p>
                              <span>
                                {selectedOption &&
                                  selectedOption.question_id ===
                                    option.question_id &&
                                  selectedOption.answer_id === option.id && (
                                    <BsCheckCircleFill className="fs-4" />
                                  )}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                      {isLastQuestion ? (
                        <Button
                          onClick={() => submitAnswers(answers)}
                          size="lg"
                          className="mt-5 mb-5 mybutton w-100"
                        >
                          Submit
                        </Button>
                      ) : (
                        <p onClick={handleNextClick} className="next">
                          Next
                        </p>
                      )}
                    </Card>
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center nodataavl Nodata">
                        No data available or something went wrong.
                      </td>
                    </tr>
                  )}
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Quiz;
