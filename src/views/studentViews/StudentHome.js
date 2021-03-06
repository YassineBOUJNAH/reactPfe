
import React, {useState, useEffect} from "react";
import InternshipOffers from "views/studentViews/InternshipOffers.js"
import Internship from "views/studentViews/Internship.js"
import StudentMeetings from "./StudentMeetings.js"
import { Link } from "react-router-dom";
import SERVER_URL from "../../variables/general";



// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

const User = () => {
  const [supervisor, setSupervisor] = useState([]);
  const [internshipOffers, setInternshipOffers] = useState([]);
  const [internship, setInternship] = useState([]);
  const PORT = "8081";
  const token  = sessionStorage.getItem('jwt');
  const currentuser =  JSON.parse(sessionStorage.getItem('currentuser')); //student   

  useEffect(() => {
    console.log("component update...");
    fetchSupervisor();
    fetchInternshipOffers();
    fetchInternship();
  }, []);

  const fetchSupervisor = async () => {
    console.log("feeetch !!");
    const response = await fetch(
      SERVER_URL+"internships/student/"+currentuser.id, {
        headers: { 'Authorization': token }
      }
    );
    const data = await response.json();
    setSupervisor(data);
    console.log("sup: "+data);
  };

  const fetchInternshipOffers = async () => {
    console.log("feeetch !!");
    console.log(currentuser.id+" user id");
    const response = await fetch(
      SERVER_URL+"internshipoffers/student/"+currentuser.id+"", {
        headers: { 'Authorization': token }
      }
    );
    const data = await response.json();
    setInternshipOffers(data);
    console.log("test"+data);
  };

  const fetchInternship = () => {
    const token = sessionStorage.getItem('jwt');
    const currentuser = JSON.parse(sessionStorage.getItem('currentuser'));

    fetch(SERVER_URL+"internships/student/"+currentuser.id, {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then(
        (data) => {
          console.log("internship dta: "+data+" id: "+currentuser.id);
          //console.log(data[0].id);
          setInternship(data);
        },
        (error) => {

        }
      )
  };

      return (
      <>
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={require("assets/img/damir-bosnjak.jpg")}
                  />
                </div>
                <CardBody xs="4" className="row justify-content-sm-center">
                  <div className="author">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/student.png")}
                      />
                      <h5 className="title">{currentuser.username}</h5>
                    </a>
                    <p className="description ">
                  {currentuser.frstname} {currentuser.lastname}
                  </p>
                  </div>
                  <p className="description text-center">{currentuser.email}</p>
                  
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          {internshipOffers.length} <br />
                          <small>Offers</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                        {internship.length} <br />
                          <small>Accepted</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h5>
                          0 <br />
                          <small>Msg</small>
                        </h5>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">My Supervisor</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                    <li>
                    {supervisor.map((sup, id) => (
                      <Row key={sup.id}>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/clem-onojeghuo-3.jpg")}
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                        {sup.supervisor.frstname} {sup.supervisor.lastname}<br />
                          <span className="text-muted">
                            <small>{sup.supervisor.email}</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            tag={Link} to="/student/myposts"
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    ))}
                    </li>
                  </ul>
                </CardBody>
              </Card>
              
            </Col>
            <Col md="8">
                <Internship internship={internship}></Internship>
                <InternshipOffers internship={internship} internshipOffers={internshipOffers}></InternshipOffers>
                {/* <Card>
                <CardBody>
                <StudentMeetings></StudentMeetings>
                <button type="submit" class="btn-round btn btn-primary">
                    Show all
                </button>
                </CardBody>
              </Card> */}
            </Col>
          </Row>
        </div>
      </>
    );
  }

export default User;

