import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import loader from "../../assets/images/giphy.gif";
import profile_image from "../../assets/images/imageproifle.jpg";



function Faculty() {
  const user_id = localStorage.getItem("user_id");
  const school_id = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [teacherID, setTeacher] = useState([]);
  const [image, setimage] = useState([]);
  const navigate = useNavigate();
  const isLoading = useRef(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoading.current = true;
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}teacher-lists`;
        console.warn(url);
        const formData = new FormData();

        formData.append("school_id", school_id);
        formData.append("user_id", user_id);

        const config = {
          method: "POST",
          url: url,
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios(config);
        setUsers(response.data.data); // Change here
        const completeImageUrl = response.data.url;
        setimage(completeImageUrl);

        const firstTeacherId = response.data.data.length > 0 ? response.data.data[0].teacher_id : null;
        setTeacher(firstTeacherId);
        localStorage.setItem("teacher_id", firstTeacherId);
        isLoading.current = false;
        setLoading(false);
      } catch (error) {
        isLoading.current = false;
        setLoading(false);
        console.error("Error fetching user data:", error);
      }
    };
    if (!isLoading.current) {
      fetchData();
    }
  }, []);

  const capitalizeWords = (str) => {
    if (!str) return ''; // return an empty string if str is undefined or null
    return str.replace(/\b\w/g, char => char.toUpperCase());
};

  return (
    <div className="App profile Attendance holiday">
   <div className="d-flex justify-content-between heading_content background-custum ">
        <Link to="/">
          <IoIosArrowBack className=" text-light" />
        </Link>
        <p className="text-light schoolnotification ms-1">
        School Faculty
        </p>
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


              {users && users.length > 0 ? (
                users.map((teacher, index) => (
                  <div className="inst-card v2" key={index}>
                    <div className="inst-item">
                      <div className="inst-img-wrapper v2">
                        {teacher.profile_image == "" ? (
                          <img className="teacher-profileee" src={profile_image} alt="Teacher Profile" />
                        ) : (
                          <img className="teacher-profileee" src={`${image}/${teacher.profile_image}`} alt="Teacher Profile" />
                        )}
                      </div>
                      <div className="inst-info">
                        <h3 className="instname">
                        
                {teacher && capitalizeWords(teacher.teacher_name)}
                        </h3>
                        <div className="d-flex gap-2 subjecttech">


                        {teacher.subjects.map((subject, subIndex) => (
                          <p key={subIndex}>{subject.subject_name}</p>
                        ))}
                        
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center nodataavl Nodata1">
                    No data available or something went wrong.
                  </td>
                </tr>
              )}

            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Faculty;
