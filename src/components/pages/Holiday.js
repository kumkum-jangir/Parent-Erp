import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Splashh from "../../assets/images/holiday.jpg";
import loader from "../../assets/images/giphy.gif";
import profile_image from "../../assets/images/imageproifle.jpg";

function Holiday() {
  const user_id = localStorage.getItem("user_id");
  const school_id = localStorage.getItem("school_id");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [image, setimage] = useState([]);
  const isLoading = useRef(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoading.current = true;
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL}holiday-list`;
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
        setUser(response.data.data);
        const completeImageUrl = response.data.url;
        setimage(completeImageUrl);
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

  return (
    <div className="App profile Attendance holiday">
      <div className="d-flex justify-content-between heading_content background-custum ">
        <Link to="/">
          <IoIosArrowBack className=" text-light" />
        </Link>
        <p className="text-light schoolnotification ms-1">Holiday</p>
        <p className="text-light schoolnotification ms-1"></p>
      </div>
      <Container>
        {loading ? (
          <div className="img-fluidloder">
            <img src={loader} alt="Loading..." />
          </div>
        ) : (
          <div>
            {user && user.length > 0 ? (
              user &&
              user.map((holiday, index) => (
                <div className="holidaylist">
                  <div className="d-flex">
                    <div className="width-image-festival">
                      {/* <img
                        src={`${image}/${holiday.holiday_image}`}
                      /> */}
                      {holiday.holiday_image == null ? (
                        <img
                          className="teacher-profileee"
                          src={profile_image}
                          alt="Teacher Profile"
                        />
                      ) : (
                        <img
                          className="teacher-profileee"
                          src={`${image}/${holiday.holiday_image}`}
                          alt="Teacher Profile"
                        />
                      )}
                    </div>
                    <div className="margin-left-25">
                      <small>{holiday.holiday_types} Holiday</small>
                      {/* <date>01-2023</date> */}
                      <h3 className="mb-0">{holiday.title} </h3>
                      <span className="mb-0 details_para">{holiday.holiday_details} </span>
                  <div className="d-flex justify-content-between">
                    <div className="text-center datetime">
                      <small className="d-block">Start Date</small>
                      <p className="pb-0">
                        {new Date(
                          holiday.holiday_start_date
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-center datetime">
                      <small className="d-block">End Date</small>
                      <p className="pb-0">
                        {new Date(holiday.holiday_end_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <img
                  src={Splashh}
                  alt="Gallery_img"
                  className="img-fluid"
                  style={{
                    height: "80%",
                    width: "50%",
                    borderRadius: "15px",
                  }}
                />
                <h1>Holiday Not Available</h1>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Holiday;
