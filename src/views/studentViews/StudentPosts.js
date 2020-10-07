
import React, { useState, useEffect } from "react";
import InternshipOffers from "views/studentViews/InternshipOffers.js"
import StudentMeetings from "./StudentMeetings.js"


// reactstrap components
import { Form, Row, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button, FormFeedback, Alert, Card, CardBody, CardText, CardLink, CardSubtitle, CardTitle } from 'reactstrap'


const User = () => {
    const [supervisor, setSupervisor] = useState([]);
    const [internshipOffers, setInternshipOffers] = useState([]);
    const [post, setPost] = useState([]);
    const PORT = "8081";
    const token = sessionStorage.getItem('jwt');
    const currentuser = JSON.parse(sessionStorage.getItem('currentuser')); //student   

    useEffect(() => {
        console.log("component update...");
        fetchSupervisor();
        fetchInternshipOffers();
        fetchPost();
    }, []);

    const fetchSupervisor = async () => {
        console.log("feeetch !!");
        const response = await fetch(
            "http://localhost:8081/internships/student/" + currentuser.id, {
            headers: { 'Authorization': token }
        }
        );
        const data = await response.json();
        setSupervisor(data);
        console.log("sup: " + data);
    };

    const fetchInternshipOffers = async () => {
        console.log("feeetch !!");
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
        console.log("feeetch posts !!");
        console.log(currentuser.id + " user id");

        const supID = supervisor.map((sup) => (sup.supervisor.id));
        console.log(supID + "sup id");
        const response = await fetch(
            "http://localhost:8081/supervisors/6/posts", {
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
