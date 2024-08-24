import React from 'react'
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
export default function Notificationview() {
  
  return (
    <div>
       <div className="d-flex justify-content-between heading_content background-custum ">
        <Link to="/">
          <IoIosArrowBack className="fs-2 text-light" />
        </Link>
        <p className="text-light schoolnotification ms-1">
          School Notifications
        </p>
        <p className="text-light schoolnotification ms-1"></p>
      </div>

    </div>
  )
}
