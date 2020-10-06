
import React, {useState, useEffect} from "react";
import InternshipOffers from "views/studentViews/InternshipOffers.js"

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
  const PORT = "8081";
  const token  = sessionStorage.getItem('jwt');
  const currentuser =  JSON.parse(sessionStorage.getItem('currentuser')); //student   

  useEffect(() => {
    console.log("component update...");
    fetchSupervisor();
    fetchInternshipOffers();
  }, []);

  const fetchSupervisor = async () => {
    console.log("feeetch !!");
    const response = await fetch(
      "http://localhost:8081/users", {
        headers: { 'Authorization': token }
      }
    );
    const data = await response.json();
    setSupervisor(data);
    console.log("test"+data);
  };

  const fetchInternshipOffers = async () => {
    console.log("feeetch !!");
    console.log(currentuser.id+" user id");
    const response = await fetch(
      "http://localhost:8081/internshipoffers/student/"+currentuser.id+"", {
        headers: { 'Authorization': token }
      }
    );
    const data = await response.json();
    setInternshipOffers(data);
    console.log("test"+data);
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
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/mike.jpg")}
                      />
                      <h5 className="title">Chet Faker</h5>
                    </a>
                    <p className="description">@chetfaker</p>
                  </div>
                  <p className="description text-center">
                    "I like the way you work it <br />
                    No diggity <br />I wanna bag it up"
                  </p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          12 <br />
                          <small>Offers</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          2 <br />
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
                  <CardTitle tag="h4">My Meetings</CardTitle>
                </CardHeader>
                <CardBody>
                <p class="description text-center">Great, no meeting in the coming days!</p>
                <button type="submit" class="btn-round btn btn-primary">Show all</button>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">My Supervisor</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                    <li>
                    {supervisor.map((sup) => (
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                        {sup.username} <br />
                          <span className="text-muted">
                            <small>{sup.email}</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
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
              <Card className="card-user">
                <InternshipOffers internshipOffers={internshipOffers}></InternshipOffers>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }

export default User;
