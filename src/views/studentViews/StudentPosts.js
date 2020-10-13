
import React, { useState, useEffect } from "react";
import InternshipOffers from "views/studentViews/InternshipOffers.js"
import StudentMeetings from "./StudentMeetings.js"


// reactstrap components
import { Form, Row, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button, FormFeedback, Alert, Card, CardBody, CardText, CardLink, CardSubtitle, CardTitle } from 'reactstrap'


const User = () => {
    const [supervisor, setSupervisor] = useState('');
    const [internshipOffers, setInternshipOffers] = useState([]);
    const [post, setPost] = useState([]);
    const PORT = "8081";
    const token = sessionStorage.getItem('jwt');
    const currentuser = JSON.parse(sessionStorage.getItem('currentuser')); //student   

    useEffect(() => {
        fetchSupervisor();
        fetchInternshipOffers();
        fetchPost();
    }, []);
/*
    const fetchSupervisor = async () => {
        console.log("feeetch !!");
        const response = await fetch(
            "http://localhost:8081/internships/student/" + currentuser.id, {
            headers: { 'Authorization': token }
        })
          .then(res => res.json())
          .then(
            (data) => {
              console.log("internship dta: "+data+" id: "+currentuser.id);
              console.log(data);
              setSupervisor(data);
              fetchPost();
            console.log("sup: " + data[0].supervisor.id);
            },
            (error) => {
                console.error(error);
            }
          )};
    */
    const fetchSupervisor = async () => {
        const response = await fetch(
            "http://localhost:8081/internships/student/" + currentuser.id, {
            headers: { 'Authorization': token }
        }
        );
        const data = await response.json();
        setSupervisor(data[0].supervisor.id);
        fetchPost();
        console.log("sup: " + data[0].supervisor.id);
    };
    

    const fetchInternshipOffers = async () => {
        console.log(currentuser.id + " user id");
        const response = await fetch(
            "http://localhost:8081/internshipoffers/student/" + currentuser.id + "", {
            headers: { 'Authorization': token }
        }
        );
        const data = await response.json();
        setInternshipOffers(data);
        console.log("test" + data);
    };

    const fetchPost = async () => {
        console.log(currentuser.id + " user id");

        //const supID = supervisor[0].id;
        console.log(supervisor + "sup id");
        console.log(supervisor);
        //const supID = supervisor[0].supervisor.id;
        const response = await fetch(
            "http://localhost:8081/supervisors/"+supervisor+"/posts", {
            headers: { 'Authorization': token }
        }
        );
        const data = await response.json();
        setPost(data);
        console.log("test" + data);
    };

    return (
        <>
            <div className="content">
                <Row>
                    <h1>Posts by your supervisor</h1>
                    {post.map((post) =>
                        <Card className="card_post">
                            <CardBody>
                                <CardTitle className="cardtitle">{post.description}</CardTitle>
                                <CardSubtitle className="cardsub">Pasted At : {post.postedAt}</CardSubtitle>
                                <CardText className="cardtext">{post.content}</CardText>
                            </CardBody>
                        </Card>

                    )}
                </Row>
            </div>
        </>
    )
}
export default User;
