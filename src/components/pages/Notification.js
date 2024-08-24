import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import loader from "../../assets/images/giphy.gif";
import nodata from "../../assets/images/nodata.png";
import axios from "axios";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";

function Notification() {
  const school_id = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const [notifications, setNotifications] = useState([]);
  const [details, setDetails] = useState([]);
  const isLoading = useRef(false);
  const [loading, setLoading] = useState(false);

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
      const leaveData = response.data.data;
      setNotifications(leaveData);
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
    if (!isLoading.current) {
      getNotification();
    }
  }, []);

  return (
    <div className="notificationdesign">
      <div className="d-flex justify-content-between heading_content background-custum ">
        <Link to="/">
          <IoIosArrowBack className=" text-light" />
        </Link>
        <p className="text-light schoolnotification ms-1">
          School Notifications
        </p>
        <p className="text-light schoolnotification ms-1"></p>
      </div>

      <div className="App Attendance holiday notiParent">
        <Container>
          {loading ? (
            <div className="img-fluidloder">
              <img src={loader} alt="Loading..." />
            </div>
          ) : (
            <React.Fragment>
                 <div>
                        {notifications && notifications.length > 0 ? (
                          notifications.map((communication, index) => (
                            <div className="notification-list mb-30">
                              <ul>
                                <li>
                                  <div className="card">
                                    <h5 className="item-title">
                                      {communication && communication.title}
                                    </h5>
                                    <div className="item-text">
                                      {communication &&
                                        communication.description}
                                    </div>
                                    <div className="item-time">
                                      <span className="time">
                                        <MdOutlineDateRange />
                                        {communication && communication.date}
                                      </span>
                                      <span className="time">
                                        <FaRegClock />
                                        {communication && communication.time}
                                      </span>
                                      {/* <Link to="/notificationview" className="mark text-primary">
                                        Read More
                                      </Link> */}
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            // <Card className="holiday_list p-0 bgimagefortop">
                            //   <Card.Body className="pn-5">
                            //     <Card.Text className="bg-image-new">
                            //       <div className="meetingtime">
                            //         <h1 className="titlecom">{communication && communication.title}</h1>
                            //         <div className="card_time">
                            //           <div className="d-flex justify-content-between py-2">
                            //             <div className="startdate d-flex">
                            //               <small className="d-block">Date :</small>
                            //               <small> {communication && communication.date}</small>
                            //             </div>
                            //             <div className="enddate  d-flex">
                            //               <small className="d-block">Time :</small>
                            //               <small> {communication && communication.time}</small>
                            //             </div>
                            //           </div>
                            //           <div className="discriptiondetails">
                            //             <h6 className="d-block">Description</h6>
                            //             <p className="desc"> {communication && communication.description}</p>
                            //           </div>
                            //         </div>
                            //       </div>
                            //     </Card.Text>
                            //   </Card.Body>
                            // </Card>
                          ))
                        ) : (
                          <div
                             
                              className="text-center nodataavl Nodata1"
                            >
                             <img src={nodata} alt="No data"/>
                            </div>
                        )}
                      </div>
            </React.Fragment>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Notification;
