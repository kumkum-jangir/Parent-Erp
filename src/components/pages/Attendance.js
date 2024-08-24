import React, { useState, useEffect,useRef } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import loader from "../../assets/images/giphy.gif";
import axios from "axios";
import calendar from '../../assets/svg/calendar-icon-calendar-logo-date-time-icon_761928-109.avif';

function Attendance() {
  const school_id = localStorage.getItem("school_id");
  // const class_id = localStorage.getItem("student_class_id");
  const parent_id = localStorage.getItem("user_id");
  const kids_id = localStorage.getItem("kids_id");
  const student_class_id = localStorage.getItem("student_class_id");
  const token = localStorage.getItem("token");
  const [Attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoading = useRef(false);
  const [monthss, setMonth] = useState([]);


  useEffect(() => {
    if(!isLoading.current){
     loadTeachers();
    }
  }, []);

  const loadTeachers = async () => {
    try {
      isLoading.current = true;
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}parent-student-attendance-percent-list`;
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
      const attendanceMonth = response.data.granPercent;
      const attendanceData = response.data.data;
      console.warn(attendanceData);
      setMonth(attendanceMonth);
      // alert(attendanceMonth);
      setAttendance(attendanceData);
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

  const handleButtonClick = ( month, attendance_year,) => {
    localStorage.setItem("month", month);
    localStorage.setItem("year", attendance_year);
    
    // alert(attendance_year);
  };


  return (
    <div className="App profile fee Assignment">
         <div className="d-flex justify-content-between heading_content background-custum ">
        <Link to="/">
          <IoIosArrowBack className=" text-light" />
        </Link>
        <p className="text-light schoolnotification ms-1">
        Attendance Management
        </p>
        <p className="text-light schoolnotification ms-1"></p>
      </div>
      <Container>
        
        {loading ? (
          <div className="img-fluidloder">
            <img src={loader} alt="quiz" />
          </div>
        ) : (
         <div>
            <Card className="inst-card v2">
          <div className="inst-item">
            <div className="inst-img-wrapper v2">
              <img className="inst-ing" src={calendar}/>
            </div>

            <div className="inst-info">
              <p className="instname">{monthss}</p>
              <span className="Subject1">
               Arrange Attendance till date
              </span>
            </div>
          </div>
        </Card>
          {Attendance && Attendance.map((months)=>(
            <Col md={3} sm={3} xs={3}>
               <Link to="/TotalAttendance">
                <div className="" onClick={() =>handleButtonClick(months.month, months.attendance_year)}>
                   <div className="card_box">
                   <h5 className="text-center text-dark m-0">{months.percent}%</h5>
                   <p className="text-center text-dark text-capitalize p-0 m-0"> {months.month}</p>
                   </div>
                </div>
                </Link>
            </Col>
           
            ))}
         </div>
          // <Col lg={12} md={12} sm={12} className="pb-5 heading_content">
          //   <div className="round_bg">
          //     <Container className="mt-5">
          //       {/* {.map((teacher) => ( */}
          //         <Col
                    
          //           className="my-2"
          //           lg={12}
          //           xs={12}
          //         >
                 
          //           {/* </Link> */}
          //         </Col>
          //       {/* ))} */}

               
          //     </Container>
          //   </div>
          // </Col>
        )}
      </Container>
    </div>
  );
}

export default Attendance;


// import React, { useState, useEffect, useRef } from "react";
// import { Row, Col, Container, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Calendar from "react-calendar";
// import { IoIosArrowBack } from "react-icons/io";
// import "react-calendar/dist/Calendar.css";
// import axios from "axios";

// function TotalAttendance() {
//   const [date, setDate] = useState(new Date());
//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//   };
//   const school_id = localStorage.getItem("school_id");
//   const parent_id = localStorage.getItem("user_id");
//   const kids_id = localStorage.getItem("kids_id");
//   const class_id = localStorage.getItem("student_class_id");
//   const year = localStorage.getItem("year");
//   const student_class_id = localStorage.getItem("student_class_id");
//   const storedMonth = localStorage.getItem("month");
//   const token = localStorage.getItem("token");
//   const isLoading = useRef(false);

//   const currentDate = new Date();
//   const monthAbbreviations = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];

//   const initialSelectedMonth = storedMonth ? monthAbbreviations.indexOf(storedMonth) : currentDate.getMonth();
//   const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);
//   const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
//   const [attendanceData, setAttendanceData] = useState('');
//   const [presentDays, setPresentDays] = useState({
//     count: 0,
//     dates: [],
//   });
//   const [absentDays, setAbsentDays] = useState({
//     count: 0,
//     dates: [],
//   });

//   const loadTeachers = async () => {
//     try {
//       isLoading.current = true;
//       const url = `${process.env.REACT_APP_API_URL}student-attendance`;
//       const formData = new FormData();
//       formData.append("kids_id", kids_id);
//       formData.append("school_id", school_id);
//       formData.append("class_id", student_class_id);
//       formData.append("month", monthAbbreviations[selectedMonth]);
//       formData.append("year", year);

//       const config = {
//         method: "post",
//         url: url,
//         data: formData,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       };
//       const response = await axios(config);
//       const apiData = response.data.data;
  
//       const presentData = apiData.filter(
//         (item) => item.attendance_status === "P"
//       );
  
//       const absentData = apiData.filter(
//         (item) => item.attendance_status === "A"
//       );
  
//       setPresentDays({
//         count: presentData.length,
//         dates: presentData.map((item) => new Date(item.attendance_date)),
//       });
//       isLoading.current = false;
//       setAbsentDays({
//         count: absentData.length,
//         dates: absentData.map((item) => new Date(item.attendance_date)),
//       });
  
//       setAttendanceData(apiData);
//     } catch (error) {
//       isLoading.current = false;
//       console.error("There was a problem with the fetch operation:", error);
//     }
//   };

//   useEffect(() => {
//     if(!isLoading.current){
//       loadTeachers();
//      }
//   }, [selectedMonth, year]);

//   const handleDateChange1 = (newDate) => {
//     setSelectedMonth(newDate.getMonth());
//     setSelectedYear(newDate.getFullYear());
//   };

//   const tileContent = ({ date }) => {
//     const currentDate = `${date.getFullYear()},${String(date.getMonth() + 1).padStart(2, '0')},${String(date.getDate()).padStart(2, '0')}`;
//     const isPresent = presentDays.dates.some(
//       (d) => {
//         const formattedDate = `${d.getFullYear()},${String(d.getMonth() + 1).padStart(2, '0')},${String(d.getDate()).padStart(2, '0')}`;
//         return formattedDate === currentDate;
//       }
//     );
  
//     const isAbsent = absentDays.dates.some(
//       (d) => {
//         const formattedDate = `${d.getFullYear()},${String(d.getMonth() + 1).padStart(2, '0')},${String(d.getDate()).padStart(2, '0')}`;
//         return formattedDate === currentDate;
//       }
//     );
  
//     return (
//       <div className={`tile-content ${isPresent ? 'present-day' : ''} ${isAbsent ? 'absent-day' : ''}`}>
//         {isPresent && <span className="present-mark">P</span>}
//         {isAbsent && <span className="absent-mark">A</span>}
//       </div>
//     );
//   };

//   return (
//     <div className="App profile Attendance">
//     <Container>
//       <Row className="heading_content">
//         <Col md={12} sm={12} xs={12}>
//           <div className="heading_right">
//             <Link to="/Attendance">
//               <IoIosArrowBack className=" text-light" />
//             </Link>
//             <div className="attend_tabs">
//               <Link to="/TotalAttendance" className="attend_tabs1">
//                 ATTENDANCE
//               </Link>
//               <Link to="/Holiday" className="attend_tabs2">
//                 HOLIDAY
//               </Link>
//             </div>
//           </div>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={12} sm={12}>
//           <div className="round_bg">
//             <Container>
//               <Row className="two_option">
//                 <Calendar value={new Date(selectedYear, selectedMonth)} onChange={handleDateChange1} tileContent={tileContent} />
//                 <Col md={12} sm={12} className="event">
//                   <Card className="absent festive">
//                     <div className="d-flex">
//                       <p>Present</p>
//                       <div className="d-flex justify-content-end w-100">
//                         <div className="round_red green">
//                           <span>{presentDays.count}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </Card>
//                   <Card className="absent">
//                     <div className="d-flex">
//                       <p>Absent</p>
//                       <div className="d-flex justify-content-end w-100">
//                         <div className="round_red">
//                           <span>{absentDays.count}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <p>Date: {absentDays.dates.map(date => date.toDateString()).join(", ")}</p>
//                     </div>
//                   </Card>
//                 </Col>
//               </Row>
//             </Container>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   </div>
// );
// }

// export default TotalAttendance;



