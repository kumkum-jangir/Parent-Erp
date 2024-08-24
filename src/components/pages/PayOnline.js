import React, { useState, useRef, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import { ImFilePdf } from "react-icons/im";

function PayOnline() {
  const school_id = localStorage.getItem("school_id");
  const class_id = localStorage.getItem("student_class_id");
  const fee_id = localStorage.getItem("fee_id");
  const parent_id = localStorage.getItem("user_id");
  const kids_id = localStorage.getItem("kids_id");
  const student_class_id = localStorage.getItem("student_class_id");
  const token = localStorage.getItem("token");
  const [fee, dueFee] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoading = useRef(false);
  const [image, setImage] = useState([]);
  const [total, totalPaid] = useState([]);

  useEffect(() => {
    if (!isLoading.current) {
      StudentPayments();
    }
  }, []);

  const StudentPayments = async () => {
    try {
      isLoading.current = true;
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}parent-student-paid-payments`;
      const formData = new FormData();
      formData.append("school_id", school_id);
      formData.append("class_id", student_class_id);
      formData.append("kids_id", kids_id);
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
      const TotalAmount = response.data.totalPaidAmount;
      const teachersData = response.data.data;

      console.warn(teachersData);
      totalPaid(TotalAmount);
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
  return (
    <div className="App profile fee Pay_online">
       <div className="d-flex justify-content-between heading_content background-custum ">
        <Link to="/">
          <IoIosArrowBack className=" text-light" />
        </Link>
        <p className="text-light schoolnotification ms-1">Pay Online</p>
        <p className="text-light schoolnotification ms-1"></p>
      </div>
      <Container>
 
<div className="d-flex justify-content-end downloadpdf">
<button
                              
                              className="pdfbtn"
                               onClick={() => window.print()}
                            >
                              Download Pdf{" "}
                              <ImFilePdf className="ms-2 fs-5" />
                            </button>
</div>
    <div className="table-responsive">
    <Table striped bordered hover className="table-striped" responsive="xs" size="sm">
                    <thead className="thead-primary">
                      <tr>
                        <th>Sr</th>
                        <th>Student Name</th>
                        <th>Class Name</th>
                        <th>Paid Amount</th>
                        <th>Paid month</th>
                        <th>Fees status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fee.map((feepe) => (
                        <tr className="text-center">
                          <td>{feepe.SrNo}</td>
                          <td className="text-capitalize">{feepe.student_name}</td>
                          <td>{feepe.class_name}th</td>
                          <td><strong>{feepe.paid_amount}</strong></td>
                          <td>{feepe.month}</td>
                          <td className=" text-capitalize"> <span className="badge text-white  bg-success">{feepe.fees_status}</span></td>
                        </tr>
                
                      ))}

                    </tbody>
                    <tfoot>
                    <tr className="text-right">
                        
                      <td colSpan={6} className="text-right"><b>Total Paid : {total} /-</b></td>            
                      </tr>
                    </tfoot>
                  </Table>
    </div>

                 
      </Container>
    </div>
  );
}

export default PayOnline;
