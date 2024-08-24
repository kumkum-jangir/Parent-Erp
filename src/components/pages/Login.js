import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import group from '../../assets/images/Group.png';
import group1 from '../../assets/images/Group-1.png';
import group2 from '../../assets/images/Group-2.png';
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ue from "../../assets/images/ue.png";
import ue2 from "../../assets/images/ue2.png";

import { Link,useLocation } from "react-router-dom";
import Splash from "../../assets/images/login.png";
import { ArrowRight, EyeSlash, EyeFill } from "react-bootstrap-icons";
import '../../assets/css/login.css';


function App() {
  const handleTogglePassword = () => {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
  };


  
  
  const [showComponent, setShowComponent] = useState(true);
  const [hideComponent, sethideComponent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowComponent(false);
      sethideComponent(true);
    }, 2000);
  }, []);
  
  const [showPassword, setShowPassword] = useState(false);
  const [name, setname] = useState("");
  const [password, setPassword] = useState("")
  const [browserId, setBrowserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState("");

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onInputChangename = (e) => {
    setname(e.target.value);
  };

  const onInputChangepassword = (e) => {
    setPassword(e.target.value);
  };


  
  useEffect(() => {
    const broker_id = localStorage.getItem("token");
 
    // console.warn(student_class_id)
    
    // alert(broker_id)
  
    
    if (broker_id ) {
      navigate('/Login');
    }
    let browserId = Cookies.get('browserId');


    if (!browserId) {
      browserId = uuidv4();
      Cookies.set('browserId', browserId, { expires: 20 });
    }
    setBrowserId(browserId)
  }, []);

  const Submit = async () => {
    try {
      if (!name) {
        toast.error('Please enter a valid Student Email.');
        return;
      }
      if (!password || password.length < 6) {
        toast.error('Password must be at least 6 characters long.');
        return;
      }

      setLoading(true); 

      let url = (`${process.env.REACT_APP_API_URL}parent-login`);
      const formData = new FormData();
      formData.append('email', name);
      formData.append('password', password);
      const config = {
        method: 'POST',
        url: url,
        data: formData,
      };

      axios(config)
        .then(function (response) {
          
          if (response.data.status === 0) {
            const message = response.data.message;
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: message,
              timer: 2000
            })
          }
          else if (response.data.status === 1) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Login successfully.',
              timer: 2000
            }).then((result) => {
              // navigate('/');
              localStorage.setItem("user_id", response.data.data.id);
              localStorage.setItem('school_id', response.data.data.school_id);
              localStorage.setItem('token', response.data.bear_token);
              localStorage.setItem('multi_device_session', response.data.multi_device_session);

              // window.localStorage.setItem('isLoggedIn', true);
              // localStorage.setItem("isLoggedIn", "true");
              // setLoggedIn(true);
              // Redirect to dashboard or any other authenticated route
              navigate("/");
            })
          } else {
            toast.error(response.data.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setLoading(false); 
    }
  }

  return (
    <div className="new_body pt-3">
      <Container>
        <Row className="h-100 vertical-align-middle align-items-center justify-contain-center">
          <Col xl={12} className="my-5">
            <div className="card rounded-4 border-0 position-relative">
              <div className="card-body p-0 z-1 rounded-4 bg-white">
                <Row className="m-0">
                  <Col md={6} lg={5}>
                    <div className="d-flex justify-content-between">
                     <div className="width_logo">
                     <img src={ue} alt="logo"  />
                     </div>
                     <div className="width_logo">

                      <img src={ue2} alt="logo2"  />
                    </div>
                    </div>
                    <div className="sign_in">
                      <h4 className="fs-20 text-black loginschool">Login</h4>
                      <h6 className="accountdetails">Enter your account details</h6>
                      <Form className="">
                        <Form.Group className="mb-2">
                          <Form.Control
                            type="text"
                            required value={name} 
                            onChange={onInputChangename}
                            className="form-control-login  border-bottom"
                            placeholder="Enter Email"
                          />
                        </Form.Group>
                        <Form.Group className="mb-2 password-container">
                          <Form.Control
                                      type={showPassword ? "text" : "password"}
                                      placeholder="Password"
                                      className="form-control-login  border-bottom"
                                      value={password}
                                  onChange={onInputChangepassword}
                                  required
                                 
                                    />
                                    {showPassword ? (
                                    <EyeSlash
                                      className="eye"
                                      onClick={togglePasswordVisibility}
                                    />
                                  ) : (
                                    <EyeFill
                                      className="eye"
                                      onClick={togglePasswordVisibility}
                                    />
                                  )}
                        </Form.Group>
                        {/* <div className="row d-flex justify-content-between forgetpassword">
                            <a href="#" className="forgetpsw">
                              Forgot Password?
                            </a>
                         
                        </div> */}
                        <div className="text-center">
                          <button type="submit" onClick={Submit} disabled={loading} className="btn btn-color-custum btn-block">
                            Login
                            {loading && <Spinner animation="border" />}
                          </button>
                        </div>
                      </Form>
                      <div className="d-flex gap-2 justify-content-center signregister align-items-center" style={{height:"220px"}}>
                        {/* <a href="#" className="forgetpsw">
                          Don’t have an account?
                        </a> */}
                        {/* <Link href="/" className="text-primary sign_up_btn">
                          Sign up
                        </Link> */}
                      </div>
                    </div>
                  </Col>
                  <Col md={6} lg={7} className="sign text-light d-none d-md-block position-relative">
                    <div className="ms-lg-3 ms-1">
                      <h2 className="fs_top">
                        Welcome to <br />
                        <span>Parent</span> portal
                      </h2>
                      <p className="text-start">Login to access your account</p>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="shapesicon d-none d-md-block">
                {/* Ensure you import and use images properly */}
                <img src={group} alt="shapes" fluid className="img-fluid shapes s1" />
                <img src={group1} alt="shapes" fluid className="img-fluid shapes s2" />
                <img src={group2} alt="shapes" fluid className="img-fluid shapes s3" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
