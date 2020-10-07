
import React, { useState, useEffect } from "react";
import StudentHome from "./StudentHome.js"
import InternshipOfferForm from "./AddOfferForm.js"

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

const InternshipOffers = ({ internshipOffers }, props) => {
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
                <CardTitle tag="h4">My Internship offers</CardTitle>
                <button type="submit" class="btn-round btn btn-primary" onClick={toggle}>Add offer</button>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>Entreprise</th>
                      <th>Description</th>
                      <th className="text-right">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internshipOffers.map((internOffer) => (
                      <tr>
                        <td>{internOffer.title}</td>
                        <td>{internOffer.entreprise}</td>
                        <td>{internOffer.description}</td>
                        <td className="text-right">{internOffer.state}</td>
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

export default InternshipOffers;
