import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import { IoIosArrowBack } from "react-icons/io";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

function TotalAttendance() {
  const [date, setDate] = useState(new Date());
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  const school_id = localStorage.getItem("school_id");
  const parent_id = localStorage.getItem("user_id");
  const kids_id = localStorage.getItem("kids_id");
  // const class_id = localStorage.getItem("student_class_id");
  const year = localStorage.getItem("year");
  const student_class_id = localStorage.getItem("student_class_id");
  const storedMonth = localStorage.getItem("month");
  const token = localStorage.getItem("token");
  const isLoading = useRef(false);

  const currentDate = new Date();
  const monthAbbreviations = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const initialSelectedMonth = storedMonth ? monthAbbreviations.indexOf(storedMonth) : currentDate.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [attendanceData, setAttendanceData] = useState('');
  const [presentDays, setPresentDays] = useState({
    count: 0,
    dates: [],
  });
  const [absentDays, setAbsentDays] = useState({
    count: 0,
    dates: [],
  });

  const loadTeachers = async () => {
    try {
      isLoading.current = true;
      const url = `${process.env.REACT_APP_API_URL}parent-student-attendance`;
      const formData = new FormData();
      formData.append("kids_id", kids_id);
      formData.append("school_id", school_id);
      formData.append("class_id", student_class_id);
      formData.append("month", monthAbbreviations[selectedMonth]);
      formData.append("year", year);

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
      const apiData = response.data.data;
  
      const presentData = apiData.filter(
        (item) => item.attendance_status === "P"
      );
  
      const absentData = apiData.filter(
        (item) => item.attendance_status === "A"
      );
  
      setPresentDays({
        count: presentData.length,
        dates: presentData.map((item) => new Date(item.attendance_date)),
      });
      isLoading.current = false;
      setAbsentDays({
        count: absentData.length,
        dates: absentData.map((item) => new Date(item.attendance_date)),
      });
  
      setAttendanceData(apiData);
    } catch (error) {
      isLoading.current = false;
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    if(!isLoading.current){
      loadTeachers();
     }
  }, [selectedMonth, year]);

  const handleDateChange1 = (newDate) => {
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
  };

  const tileContent = ({ date }) => {
    const currentDate = `${date.getFullYear()},${String(date.getMonth() + 1).padStart(2, '0')},${String(date.getDate()).padStart(2, '0')}`;
    const isPresent = presentDays.dates.some(
      (d) => {
        const formattedDate = `${d.getFullYear()},${String(d.getMonth() + 1).padStart(2, '0')},${String(d.getDate()).padStart(2, '0')}`;
        return formattedDate === currentDate;
      }
    );
  
    const isAbsent = absentDays.dates.some(
      (d) => {
        const formattedDate = `${d.getFullYear()},${String(d.getMonth() + 1).padStart(2, '0')},${String(d.getDate()).padStart(2, '0')}`;
        return formattedDate === currentDate;
      }
    );
  
    return (
      <div className={`tile-content ${isPresent ? 'present-day' : ''} ${isAbsent ? 'absent-day' : ''}`}>
        {isPresent && <span className="present-mark">P</span>}
        {isAbsent && <span className="absent-mark">A</span>}
      </div>
    );
  };

  return (
    <div className="App profile Attendance">
    <Container>
      <Row className="heading_content">
        <Col md={12} sm={12} xs={12}>
          <div className="heading_right">
            <Link to="/Attendance">
              <IoIosArrowBack className="fs-2 text-light" />
            </Link>
            <div className="attend_tabs">
              <Link to="/TotalAttendance" className="attend_tabs1">
                ATTENDANCE
              </Link>
              <Link to="/Holiday" className="attend_tabs2">
                HOLIDAY
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12} sm={12}>
          <div className="round_bg">
            <Container>
              <Row className="two_option">
                <Calendar value={new Date(selectedYear, selectedMonth)} onChange={handleDateChange1} tileContent={tileContent} />
                <Col md={12} sm={12} className="event">
                  <Card className="absent festive">
                    <div className="d-flex">
                      <p>Present</p>
                      <div className="d-flex justify-content-end w-100">
                        <div className="round_red green">
                          <span>{presentDays.count}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="absent">
                    <div className="d-flex">
                      <p>Absent</p>
                      <div className="d-flex justify-content-end w-100">
                        <div className="round_red">
                          <span>{absentDays.count}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p>Date: {absentDays.dates.map(date => date.toDateString()).join(", ")}</p>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);
}

export default TotalAttendance;



