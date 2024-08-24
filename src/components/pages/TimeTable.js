import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import loader from '../../assets/images/giphy.gif';
import nodata from "../../assets/images/nodata.png";

function TimeTable() {

  const user_id = localStorage.getItem("user_id");
  const school_id = localStorage.getItem("school_id");
  const student_class_id = localStorage.getItem("student_class_id");
  const token = localStorage.getItem("token");
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [activeDay, setActiveDay] = useState(null);
  const [classtime, setClassTime] = useState([]);
  const isLoading = useRef(false);
  const [loading, setLoading] = useState(true);

  const handleDayClick = (day) => {
    if (day === getCurrentDay()) {
      setActiveDay(day);
    }
  };

  const getCurrentDay = () => {
    const today = new Date();
    const options = { weekday: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(today).toUpperCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoading.current = true;
        const url = `${process.env.REACT_APP_API_URL}parent-school-teacher-timetable`;
        const formData = new FormData();
        formData.append('school_id', school_id);
        formData.append('class_id', student_class_id);

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
        setClassTime(response.data.data);
        setLoading(false);
        const currentDate = new Date();
        const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const currentDay = daysOfWeek[currentDate.getDay()];
        setActiveDay(currentDay);
        isLoading.current = false;
      } catch (error) {
        isLoading.current = false;
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    if (!isLoading.current) {
      fetchData();
    }
  }, [token, student_class_id, school_id]);

  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(':');
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12; // Convert 0 hour to 12
    return `${adjustedHour}:${minute}`;
  };

  return (
    <div className="App profile fee Assignment Timetable" style={{fontFamily:"blod"}}>
         <div className="d-flex justify-content-between heading_content background-custum ">
        <Link to="/">
          <IoIosArrowBack className="fs-2 text-light" />
        </Link>
        <p className="text-light schoolnotification ms-1">
        Time table
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
                      <div className="days">
                        {daysOfWeek.map((day) => (
                          <div
                            key={day}
                            className={`single_day ${activeDay === day ? "active_day" : ""}`}
                            onClick={() => handleDayClick(day)}
                          >
                            <span>{day}</span>
                          </div>
                        ))}
                      </div>
                   

                      <div className="fee_card">
                        <Table className="mb-0 timeTable">
                          <thead>
                            <tr>
                              <th className="text-center">Subject Name</th>
                              <th className="text-center">Teacher Name</th>
                              <th className="text-center">Time</th>
                            </tr>
                          </thead>

                          <tbody >
                            {classtime && classtime.length > 0 ? (
                              classtime.map((user, index) => (
                                <tr key={index}  style={{fontFamily:"blod"}}>
                                  <td className="text-center">{user.subject_name}</td>
                                  <td className="text-center">{user.teacher_name}</td>
                                  <td className="text-center">
                                    {convertTo12HourFormat(user.from_time)} - {convertTo12HourFormat(user.to_time)}
                                  </td>
                                </tr>
                              ))
                            ) : (
                             <tr>
                              <td colSpan={3}>
                              <div>
                                 <img src={nodata} alt="No Time Table" width={150}/> 
                              </div>
                              </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                  
                  </div>
                )}
      </Container>
    </div>
  );
}

export default TimeTable;
