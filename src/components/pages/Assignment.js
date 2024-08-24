import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { ImFilePdf } from "react-icons/im";
import axios from "axios";
import loader from "../../assets/images/giphy.gif";
import pdfIcon from "../../assets/svg/icons8-export-pdf-60.png";
import noassign from '../../assets/images/assimg.png'

function Assignment() {
    const school_id = localStorage.getItem("school_id");
  const class_id = localStorage.getItem("class_id");
  const parent_id = localStorage.getItem("user_id");
  const section_id = localStorage.getItem("section_id");
  const student_class_id = localStorage.getItem("student_class_id");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const isLoading = useRef(false);
  const [assignment, setAssignment] = useState([]);
  const [pdf1, setPdf] = useState([]);
  
  

  useEffect(() => {
    if (!isLoading.current) {
      loadTeachers();
    }
  }, []);

  const loadTeachers = async () => {
    try {
      isLoading.current = true;
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}teacher-assignment-lists`;
      const formData = new FormData();
      formData.append("school_id", school_id);
      formData.append("class_id", student_class_id);
      formData.append("section_id", section_id);
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
      const completeImagePdf = response.data.url;
      // alert(completeImagePdf)
      const teachersData = response.data.data;
      console.warn(teachersData);
      setPdf(completeImagePdf);
      setAssignment(teachersData);

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

  const handleButtonClick = (
    description,
    ass_id,
    submission_date,
    created_date,
    section_id,
    subject_id
  ) => {
    localStorage.setItem("description", description);
    localStorage.setItem("id", ass_id);
    localStorage.setItem("submission_date", submission_date);
    localStorage.setItem("created_date", created_date);
    localStorage.setItem("section_id", section_id);
    localStorage.setItem("subject_id", subject_id);
  };

  return (
    <div className="App profile fee Assignment">
          <div className="d-flex justify-content-between heading_content background-custum ">
          <Link to="/">
            <IoIosArrowBack className=" text-light" />
          </Link>
          <p className="text-light schoolnotification ms-1">
          Assignment
          </p>
          <p className="text-light schoolnotification ms-1"></p>
        </div>

      <Container>
  <div>
    
  {loading ? (
          <div className="img-fluidloder">
            <img src={loader} alt="quiz" />
          </div>
        ) : (
        <div>
             {assignment && assignment.length > 0 ?(
                    assignment.map((assign) => (
                      <Card className="due_fees" key={assign.assignment_id}>
                        <div className="fee_card">
                          <Row>
                            <Col md={6} sm={6} xs={6}>
                              <b>Subject Name -</b>
                              <div className="subject">
                                <span className="text-capitalize">
                                  {assign.subject_name}
                                </span>
                              </div>
                            </Col>
                            <Col
                              className="d-flex justify-content-end"
                              md={6}
                              sm={6}
                              xs={6}
                            >
                              <b>Download Assignment</b>
                              {/*for pdf download */}
                              <a
                                href={`${pdf1}/${assign.pdf}`}
                                download={assign.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                               <img src={pdfIcon} style={{ height: "40px" }} alt="Download PDF" />
                              </a> 

                            </Col>
                          </Row>
                          <Table className="mb-0">
                            <thead>
                              <tr>
                                <th className="text-capitalize">
                                  {assign.description}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Assign Date</td>
                                <td>{assign.created_date}</td>
                              </tr>
                              <tr>
                                <td>Last Submission Date</td>
                                <td className="text-danger text-bold fs-6">
                                  {assign.submission_date}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          {/* <Link to="/SubmitAssignment" className="submit"> */}
                          <Link to="" className="submit">
                            <Button
                              size="lg"
                              className="mybutton w-100"
                              onClick={() =>
                                handleButtonClick(
                                  assign.description,
                                  assign.assignment_id,
                                  assign.submission_date,
                                  assign.created_date,
                                  assign.section_id,
                                  assign.subject_id
                                )
                              }
                            >
                              SUBMIT ASSIGNMENT{" "}
                              <ImFilePdf className="ms-2 fs-5" />
                            </Button>{" "}
                          </Link>{" "}
                        </div>
                        {/* {assign.created_date} */}
                      </Card>
                    ))
                  ) : (
                 <tr>
               <Col md={12} className="text-center assimg"> 
                        <img src={noassign} alt="Gallery_img" className="img-fluid"/>
                      </Col>
             </tr>
                  )}
        </div>
           )}
  </div>
      </Container>
    </div>
  );
}

export default Assignment;
