// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { Row, Col, Container, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { IoIosArrowBack } from "react-icons/io";
// import Splashh from "../../assets/images/holiday.jpg";
// import loader from "../../assets/images/giphy.gif";

// function Holiday() {
//   const user_id = localStorage.getItem("user_id");
//   const school_id = sessionStorage.getItem("school_id");
//   const token = sessionStorage.getItem("token");
//   const [user, setUser] = useState([]);
//   const [image, setimage] = useState([]);
//   const isLoading = useRef(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         isLoading.current = true;
//         setLoading(true);
//         const url = `${process.env.REACT_APP_API_URL}holiday-list`;
//         const formData = new FormData();
//         formData.append("school_id", school_id);
//         formData.append("user_id", user_id);
//         const config = {
//           method: "POST",
//           url: url,
//           data: formData,
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         };

//         const response = await axios(config);
//         setUser(response.data.data);
//         const completeImageUrl = response.data.url;
//         setimage(completeImageUrl);
//         isLoading.current = false;
//         setLoading(false);
//       } catch (error) {
//         isLoading.current = false;
//         setLoading(false);
//         console.error("Error fetching user data:", error);
//       }
//     };
//     if (!isLoading.current) {
//       fetchData();
//     }
//   }, []);

//   return (
//     <div className="App profile Attendance holiday">
//       <Container>
//         <Row className="heading_content">
//           <Col md={6} sm={6} xs={6}>
//             <div className="heading_right">
//               <Link to="/Dashboard">
//                 <IoIosArrowBack className="fs-2 text-light" />
//               </Link>
//               <p className="text-light ms-1">Holiday</p>
//             </div>
//           </Col>
//         </Row>

//         {loading ? (
//           <div className="img-fluidloder">
//             <img src={loader} alt="Loading..." />
//           </div>
//         ) : (
//           <Row>
//             <Col md={12} sm={12}>
//               <div className="round_bg">
//                 <h5>List of Holiday</h5>
//                 <div className="holidaylist">
//                   <div className="d-flex">
//                     <div>
//                       <date>01-2023</date>
//                     </div>
//                     <div>
//                       <small>School Holiday</small>
//                       <h3 className="mb-0">makar sankranti</h3>
//                       <div className="d-flex justify-content-between">
//                         <div>
//                           <small className="d-block">Start Date</small>
//                         </div>
//                         <div>
//                           <small className="d-block">End Date</small>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <Row className="two_option1">
//                   <Col md={12} sm={12}>
//                     {user && user.length > 0 ? (
//                       user &&
//                       user.map((holiday, index) => (
//                         <div className="holidaylist">
//                           <div className="d-flex">
//                             <div>
//                               <date>01-2023</date>
//                             </div>
//                             <div>
//                               <small>School Holiday</small>
//                               <h3 className="mb-0">makar sankranti</h3>
//                               <div className="d-flex justify-content-between">
//                                 <div>
//                                   <small className="d-block">Start Date</small>
//                                 </div>
//                                 <div>
//                                   <small className="d-block">End Date</small>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <Col md={4} lg={4} sm={12} style={{ margin: "10px" }}>
//                           <Card className="holiday_list">
//                             <Card.Img
//                               variant="top"
//                               src={`${image}/${holiday.holiday_image}`}
//                             />
//                             <Card.Body>
//                               <Card.Title>
//                                 {holiday.holiday_types} Holiday
//                               </Card.Title>
//                               <Card.Text>
//                                 <h3>{holiday.title}</h3>
//                                 <div className="d-flex justify-content-between">
//                                   <div className="startdate">
//                                     <small className="d-block">
//                                       Start Date
//                                     </small>
//                                     {holiday.holiday_start_date}
//                                   </div>
//                                   <div className="enddate">
//                                     <small className="d-block">End Date</small>
//                                     {holiday.holiday_end_date}
//                                   </div>
//                                 </div>
//                               </Card.Text>
//                             </Card.Body>
//                           </Card>
//                         </Col>
//                       ))
//                     ) : (
//                       <Col md={12} className="text-center">
//                         <img
//                           src={Splashh}
//                           alt="Gallery_img"
//                           className="img-fluid"
//                           style={{
//                             height: "80%",
//                             width: "50%",
//                             borderRadius: "15px",
//                           }}
//                         />
//                         <h1>Holiday Not Available</h1>
//                       </Col>
//                     )}
//                   </Col>
//                 </Row>
//               </div>
//             </Col>
//           </Row>
//         )}
//       </Container>
//     </div>
//   );
// }

// export default Holiday;
