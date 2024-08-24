import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Container, Card, Nav } from "react-bootstrap";
import student from "../../assets/svg/ic_attendance.svg";
import money from "../../assets/svg/ic_fees_due.svg";
import Dropdown from "react-bootstrap/Dropdown";
import Holiday from "../../assets/svg/ic_holiday.svg";
import leave from "../../assets/svg/ic_leave.svg";
import time from "../../assets/svg/ic_calendra.svg";
import result from "../../assets/svg/ic_results.svg";
import doubt from "../../assets/svg/ic_doubts.svg";
import event from "../../assets/svg/ic_event.svg";
import log from "../../assets/svg/ic_logout.svg";
import { useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import loader from "../../assets/images/giphy.gif";
import faculty from "../../assets/svg/faculty_profile.svg";
import notific from "../../assets/svg/icons8-notification-64.png";
import assign from "../../assets/svg/ic_assignment.svg";
import profile_image from "../../assets/images/imageproifle.jpg";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";


function Dashboard() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const school_id = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  console.warn(token)
  const [getuserdata, setdata] = useState([]);
  const [getstudentdata, setStudentData] = useState([]);
  const [getstudentfees, setStudentFee] = useState([]);
  const [image, setImage] = useState("");
  const [leaveData, setleaveData] = useState([]);
  const isLoading = useRef(false);
  const [loading, setLoading] = useState(false);
  const [getcount, setCount] = useState(0);
  const [profilee, setprofilee] = useState("")


  const loadUser = async () => {
    try {
      isLoading.current = true;
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}parent-Profile`;
      const formData = new FormData();
      formData.append("id", user_id);
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
      const { data } = response;

      // Check if the response indicates unauthorized access
      if (data.message === "Unauthenticated") {
        // Redirect to login page or handle unauthorized access
        navigate("/Login"); // Assuming you have imported navigate from your router library
        return; // Exit function early if unauthorized
      }

      // Process successful response
      const setstudentData = data.studentData;
      const setstudentfee = data.studentData;
      const completeImageUrl = `${data.url}/${data.parentsData.profile}`;

      const profilee = response.data.parentsData.profile;
      setprofilee  (profilee);
           
      setdata(data.parentsData);
      setStudentData(setstudentData);
      setStudentFee(setstudentfee);
      setImage(completeImageUrl);

      const leavecount = data.student_lave_count;
      setCount(leavecount);

      isLoading.current = false;
      setLoading(false);
    } catch (error) {
      isLoading.current = false;
      setLoading(false);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    if (!isLoading.current) {
      loadUser();
      getNotification();
      multi_device_session();
    }
  }, []);

  const handleLogout = () => {
    navigate("/");
    window.localStorage.removeItem("isLoggedIn");
    localStorage.clear();
  };

  const getNotification = async () => {
    try {
      isLoading.current = true;
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}parent-Communication`;
      const formData = new FormData();
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
      const leaveData = response.data.total_communication;
      setleaveData(leaveData);
      isLoading.current = false;
      setLoading(false);
    } catch (error) {
      isLoading.current = false;
      setLoading(false);
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      isLoading.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    if (user_id == null) {
      window.location.href = "/Login";
    }
    if (token == null) {
      window.location.href = "/Login";
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.href = "/Login";
  };

  const capitalizeWords = (str) => {
    if (!str) return ""; // return an empty string if str is undefined or null
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Inside your component's render method or JSX
  {
    getuserdata && capitalizeWords(getuserdata.name);
  }
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };





  const multi_device_session = async () => {
    const multi_session = localStorage.getItem("multi_device_session");
    console.warn(multi_session)

    try {
      isLoading.current = true;
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}multi_device_session`;
      const formData = new FormData();
      formData.append('id', user_id);
      // formData.append('school_id', school_id);

      const config = {
        method: 'post',
        url: url,
        data: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios(config);

      const { data } = response.data;
      // alert(data)
      console.warn(data)
      // alert(data)


      // Check if the response indicates unauthorized access
      // if ( data  != multi_session) {
      //   navigate('/Login'); 
      //   return; 
      // }

      if (data != multi_session) {

        window.location.href = '/Login';
        return;
      }


      // if(var1 != var2){
      //   logout
      //   }



      isLoading.current = false;
      setLoading(false);
    } catch (error) {
      isLoading.current = false;
      setLoading(false);
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  return (
    <div className="App dashboard_home">
      {loading ? (
        <div className="img-fluidloder">
          <img src={loader} alt="quiz" />
        </div>
      ) : (
        <>
          <Nav className="heading_content margin-top-bottom align-items-center d-flex">
            <div className="">
              {/* <div className="teacherprofile">
                       {image === "" ? (
                      <img
                        className="teacher-profileee"
                        src={profile_image}
                        alt="Teacher Profile"
                      />
                    ) : (
                      <img
                        className="teacher-profileee"
                        src={image}
                        alt="Teacher Profile"
                      />
                    )}
                  </div> */}
              <div className="user">
                <h6>{getuserdata && capitalizeWords(getuserdata.name)}</h6>
              </div>

            </div>

            <div className="d-flex justify-content-end align-items-center gap-2">
              <Link to="/Notification" className="notification_design d-flex">
                <NotificationsIcon style={{ color: 'red' }} />
                <span>{leaveData}</span>
              </Link>


              <div className="profile" onClick={toggleMenu}>

                <div className="img-box">
                {profilee === null ? (
                    <img
                      className="teacher-profileee"
                      src={profile_image}
                      alt="Teacher Profile"
                    />
                  ) : (
                    <img
                      className="teacher-profileee"
                      src={image}
                      alt="Teacher Profile"
                    />
                  )}
                </div>
              </div>
              <div className={`menu ${menuActive ? 'active' : ''}`}>
                <ul>
                  <li>
                    <a href="/Profilenew">
                      <FaUser />
                      &nbsp;Profile
                    </a>
                  </li>

                  <li>
                    <Link onClick={logout}>
                      <CiLogout />
                      &nbsp;Sign Out
                    </Link>
                  </li>
                </ul>
              </div>


            </div>
          </Nav>
          <Container>
            <div className="round_bg">
              <Row className="all_cards">
                <Col lg={6} xs={6}>
                  <Link to="/MyChild">
                    <div className="two_card">
                      <div
                        className="dp1"
                        style={{ '--i': "#3f3a66" }}

                      >
                        <img src={Holiday} alt="Student" />
                      </div>
                      <span>My Kids</span>
                    </div>
                  </Link>
                </Col>
                <Col lg={6} xs={6}>
                  <Link to="/KidsResults">
                    <div className="two_card">
                      <div
                        className="dp1"
                        style={{ '--i': "#005acf" }}

                      >
                        <img src={result} alt="Student" />
                      </div>
                      <span>Kids Result</span>
                    </div>
                  </Link>
                </Col>
                {/* <Col lg={6} xs={6}>
                    <Link to="/Attendance">
                      <div className="two_card">
                        <div className="dp1">
                          <img src={student} alt="Student" />
                        </div>
                        <p>{getstudentdata && getstudentdata.attendence}</p>
                        <span>Attendance</span>
                      </div>
                    </Link>
                  </Col> */}
                {/* <Col lg={6} xs={6}>
                    <Link to="/Fees">
                      <div className="two_card">
                        <div className="dp1">
                          <img src={money} alt="Student" />
                        </div>
                        <p>{getstudentfees && getstudentfees.dues_fee}</p>
                        <span>  Due Fees </span>
                      </div>
                    </Link>
                  </Col> */}
                <Col lg={6} xs={6}>
                  <Link to="/Faculty">
                    <div
                      className="two_card"

                    >
                      <div className="dp1"
                        style={{ '--i': "#f85a7a" }}
                      >
                        <img
                          className="faculty_profile"
                          src={faculty}
                          alt="Student"
                        />
                      </div>
                      <span>Faculty profile</span>
                    </div>
                  </Link>
                </Col>

                <Col lg={6} xs={6}>
                  <Link to="/Notification">
                    <div
                      className="two_card"

                    >
                      <div className="dp1 position-relative " style={{ '--i': "#005acf" }}
                      >
                        <div className="badge bg-danger notificationcount">
                          {leaveData}
                        </div>
                        <img src={notific} alt="Student" />
                      </div>
                      <span>Notification</span>
                    </div>
                  </Link>
                </Col>
                <Col lg={6} xs={6}>
                  <Link to="/TimeTable">
                    <div
                      className="two_card"

                    >
                      <div className="dp1" style={{ '--i': "#2eb135" }}
                      >
                        <img src={time} alt="Student" />
                      </div>
                      <span>TimeTable</span>
                    </div>
                  </Link>
                </Col>
                {/* <Col lg={6} xs={6}>
                    <Link to="/Result">
                      <div className="two_card">
                        <div className="dp1"  style={{backgroundColor:"rgb(255, 249, 235)"}}>
                          <img src={result} alt="Student" />
                        </div>
                        <span>Result</span>
                      </div>
                    </Link>
                  </Col> */}
                <Col lg={6} xs={6}>
                  <Link to="/Assignment">
                    <div className="two_card">
                      <div
                        className="dp1"
                        style={{ '--i': "#ffaa33" }}
                      >
                        <img src={assign} alt="Student" />
                      </div>
                      <span>Assignment</span>
                    </div>
                  </Link>
                </Col>
                <Col lg={6} xs={6}>
                  <Link to="/Doubt">
                    <div className="two_card">
                      <div
                        className="dp1"
                        style={{ '--i': "#87431e" }} >
                        <img src={doubt} alt="Student" />
                      </div>
                      <span>Ask Doubts</span>
                    </div>
                  </Link>
                </Col>

                <Col lg={6} xs={6}>
                  <Link to="/Holiday">
                    <div className="two_card">
                      <div
                        className="dp1"
                        style={{ '--i': "#87431e" }}

                      >
                        <img src={Holiday} alt="Student" />
                      </div>
                      <span>School Holiday</span>
                    </div>
                  </Link>
                </Col>

                <Col lg={6} xs={6}>
                  <Link to="/Application">
                    <div className="two_card">
                      <div
                        className="dp1"
                        style={{ '--i': "#ffaa33" }}

                      >
                        <img src={leave} alt="Student" />
                      </div>
                      <span>Leave Application</span>
                    </div>
                  </Link>
                </Col>

                {/* <Col lg={6} xs={6}>

                    <Link to="/Login">
                      <div className="two_card" onClick={handleLogout} >
                        <div className="dp1" style={{backgroundColor:"rgb(252, 241, 235)"}}>
                          <img src={log} alt="Student" />
                        </div>
                        <span>Logout</span>
                      </div>
                    </Link >
                  </Col> */}
              </Row>
            </div>
          </Container>
        </>
      )}
    </div>
  );
}

export default Dashboard;
