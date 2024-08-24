import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
 import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import footer from "../../assets/svg/vector_design.svg";

function ChangePassword() {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const [old_password, setold_password] = useState("")
  const [new_password, setnew_password] = useState("")
  const [confirm_password, setconfirm_password] = useState("")
  const [NumberConfirmation, setNumberConfirmation] = useState('');

  const navigate = useNavigate();


  const onInputChangeold_password = (e) => {
    setold_password(e.target.value);
  };

  const onInputChangenew_password = (e) => {
    setnew_password(e.target.value);
  };
  const onInputChangeconfirm_password = (e) => {
    setconfirm_password(e.target.value);
  };
  const Submit = async () => {
    try {
      if (new_password !== confirm_password) {
        // Show an error message or handle the mismatch appropriately
        toast.error("Password and confirmation Password do not match");
        return;
      }
      if (!old_password || !new_password || !confirm_password) {
        toast.error('Please fill in all the required fields');
        return;
      }

      const minPasswordLength = 6;
      const maxPasswordLength = 20;

      if (new_password.length < minPasswordLength || new_password.length > maxPasswordLength) {
        toast.error(`Password must be between ${minPasswordLength} and ${maxPasswordLength} characters`);
        return;
      }

      // if (new_password !== confirm_password) {
      //   toast.error('Passwords do not match');
      //   return;
      // }

      const url = `${process.env.REACT_APP_API_URL}changeStudentPassword`;

      const formData = new FormData();
      formData.append('id', user_id);
      
      formData.append('oldpass', old_password);
      formData.append('simple_pass', new_password);
      // formData.append('confirm_password', confirm_password);
      const config = {
        method: 'POST',
        url: url,
        data: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axios(config);
      if (response.data.status === 1) {
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          timer: 2000
        }).then((result) => {
          navigate('/dashboard');
        });
      } else {
        toast.error(response.data.message);
        return;
      }


    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

  }
  return (
    <div className="App profile">
      <Container>
        <Row className="heading_content">
          <Col md={12} sm={12} xs={12}>
            <div className="heading_right">
              <Link to="/Dashboard">
                <IoIosArrowBack className="fs-2 text-light" />
              </Link>
              <p className="text-light ms-1">Change Password</p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12} sm={12}>
            <div className="round_bg">
              <Container>
                <Form className="ask_doubt">
                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextEmail"
                  >
                    <Form.Label column sm="2">
                      Old Password
                    </Form.Label>
                    <Col sm="12">
                      <div></div>
                      <Form.Control
                        type="text"
                        value={old_password}
                        onChange={onInputChangeold_password}
                        className="border-0 border-bottom"
                        defaultValue={'--'}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextEmail"
                  >
                    <Form.Label column sm="2">
                      New Password
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        type="text"
                        value={new_password}
                        onChange={onInputChangenew_password}
                        defaultValue={'--'}
                        className="border-0 border-bottom"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextEmail"
                  >
                    <Form.Label column sm="2">
                      Retype Password
                    </Form.Label>
                    <Col sm="12">
                      <Form.Control
                        type="text"
                        value={confirm_password}
                        onChange={(e) => setconfirm_password(e.target.value)}
                        defaultValue={'--'}
                        className="border-0 border-bottom"
                      />
                      <Button onClick={Submit}
                        size="lg"
                        className="mt-5 mb-5 mybutton w-100"
                      >
                        CHANGE PASSWORD
                      </Button>{" "}
                    </Col>
                  </Form.Group>
                </Form>
              </Container>
              <div className="footer">
                <img
                  className="img-fluid w-100"
                  src={footer} alt="bg-footer"
                ></img>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default ChangePassword;
