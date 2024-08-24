import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Container, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import loader from "../../assets/images/giphy.gif";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Fees() {
  const navigate = useNavigate();
  const school_id = localStorage.getItem("school_id");
  // const class_id = localStorage.getItem("student_class_id");
  const student_class_id = localStorage.getItem("student_class_id");

  const fee_id = localStorage.getItem("fee_id");
  const parent_id = localStorage.getItem("user_id");
  const kids_id = localStorage.getItem("kids_id");
  // const student_class_id = localStorage.getItem("class_id");
  const token = localStorage.getItem("token");
  const [fee, dueFee] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoading = useRef(false);
  // const [image, setImage] = useState([]);
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (!isLoading.current) {
      StudentPayments();
    }
  }, []);

  const StudentPayments = async () => {
    try {
      isLoading.current = true;
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}parent-student-dues-payments`;
      const formData = new FormData();
      formData.append("school_id", school_id);
      formData.append("class_id", student_class_id);
      formData.append("kids_id", kids_id);
      formData.append("parent_id", user_id);
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
      const completeImageUrl = response.data.url;
      const teachersData = response.data.data;
      // const studentID = response.data.data.student_id;
      // studentIDD(studentID);
      console.warn(teachersData);
      // setImage(completeImageUrl);
      dueFee(teachersData);
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

  const paymentFees = async (fee_id, kids_id) => {
    try {
      isLoading.current = true;
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}parent-online-student-pay-payments`;
      const formData = new FormData();
      formData.append("school_id", school_id);
      formData.append("class_id", student_class_id);
      formData.append("kids_id", kids_id);
      formData.append("fee_id", fee_id);
      formData.append("parent_id", user_id);
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
      const data = response.data;
      if (response.status === 200) {
        if (data.status === 1) {
          Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to make the payment? If you proceed, you won't be able to restore it again. Please confirm your action.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to proceed",
            cancelButtonText: "No, cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              // User clicked on confirm button
              Swal.fire({
                title: data.message,
                html: `<p><b>Name: ${data.student_name}</b></p> <br>
                     <p><b>Amount: ${data.paid_amount}/-</b></p>`,
                icon: "success",
              });
              // Proceed to PayOnline
              navigate("/PayOnline");
            } else {
              // User clicked on cancel button
              Swal.fire({
                title: "Cancelled",
                text: "Payment process cancelled.",
                icon: "error",
              });
            }
          });
        }
      }
    } catch (error) {
      isLoading.current = false;
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleClick = (fee_id, student_id) => {
    localStorage.setItem("fee_id", fee_id);
    window.location.href = "/PayOnline";
  };
  return (
    <div className="App profile fee">
      <div className="d-flex justify-content-between heading_content background-custum ">
        <Link to="/">
          <IoIosArrowBack className=" text-light" />
        </Link>
        <p className="text-light schoolnotification ms-1">Fees Due</p>
        <p className="text-light schoolnotification ms-1"></p>
      </div>
      <Container>
        {loading ? (
          <div className="img-fluidloder">
            <img src={loader} alt="quiz" />
          </div>
        ) : (
          <Row>
            <Col md={12} sm={12}>
              {fee && fee.length > 0 ? (
                fee.map((feepe) => (
                  <Card className="due_fees">
                    <Card.Header className="text-start header_custum">
                      <Card.Title className="mb-0">Checkout</Card.Title>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <div className="fees_details">
                        <div className="d-flex justify-content-between">
                          <div>Class Name</div>
                          <div>{feepe.class_name}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>Due Date </div>
                          <div>{feepe.installment_date}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>Due Month</div>
                          <div>{feepe.month}</div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>Due Amount </div>
                          <div>₹{feepe.dues_amount}</div>
                        </div>
                      </div>

                      {/* <Link to="/PayOnline" className="signin"> */}
                      <div className="d-flex justify-content-center">
                        <button
                          size="lg"
                          className="mybutton"
                          onClick={() =>
                            paymentFees(feepe.fee_id, feepe.kids_id)
                          }
                        >
                          PAY NOW
                          <ArrowRight className="ms-2 fw-bold" />
                        </button>{" "}
                      </div>
                      {/* </Link>{" "} */}
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <div className="text-center nodataavl Nodata1" style={{paddingTop:"25px"}}>
                  Dear Student/Parent, we are pleased to inform you that there are no due fees at this time. Thank you!
                </div>

              )}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Fees;
