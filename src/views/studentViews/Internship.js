
import React, { useState, useEffect } from "react";
import StudentHome from "./StudentHome.js"
import InternshipOfferForm from "./AddOfferForm.js"
import SERVER_URL from "../../variables/general";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const Internship = ({ internship }, props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">My active Internship</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>Entreprise</th>
                      <th>Description</th>
                      <th>Start Date</th>
                      <th>Start End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internship.map((intern) => (
                      <tr>
                        <td>{intern.title}</td>
                        <td>{intern.entreprise}</td>
                        <td>{intern.description}</td>
                        <td>{intern.startdate}</td>
                        <td>{intern.lasttdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        {/* Form to add an offer*/}
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Add internship offer</ModalHeader>
          <ModalBody>
            <InternshipOfferForm></InternshipOfferForm>
        </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default Internship;
