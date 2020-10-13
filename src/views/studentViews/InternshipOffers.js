
import React, { useState, useEffect } from "react";
import StudentHome from "./StudentHome.js"
import InternshipOfferForm from "./AddOfferForm.js"
import NotificationAlert from "react-notification-alert" ; 

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

const InternshipOffers = ({ internshipOffers, internship }, props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  

  const deleteInternshipOffer = (id) => {
    const token = sessionStorage.getItem('jwt');
    fetch("http://localhost:8081/internshipoffers/delete/" + id, {
      headers: { 'Authorization': token },
      method: 'DELETE'
    }).then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        console.log("deleeeeeeeeeeeeetd id: "+id);
        //alert('internship offer deleted '+id);
        window.location.reload(true);
      } else {
        throw "Something went wrong , error status : " + response.status;
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }



  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">My Internship offers</CardTitle>
                <button disabled={internship.length >= 1} type="submit" class="btn-round btn btn-primary" onClick={toggle}>Add offer</button>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>Entreprise</th>
                      <th>Description</th>
                      <th className="text-right">State</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internshipOffers.map((internOffer) => (
                      <tr key={internOffer.id}>
                        <td>{internOffer.title}</td>
                        <td>{internOffer.entreprise}</td>
                        <td>{internOffer.description}</td>
                        <td style={internOffer.state == "Accepted" ? { color: 'green' } : { color: 'red' }}>{internOffer.state}</td>
                        <td className="text-right">
                          <button className="btn btn-danger" onClick={() => deleteInternshipOffer(internOffer.id)}>
                            Delete
                          </button>
                        </td>
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
            <InternshipOfferForm toggle={toggle} isOpen={modal}></InternshipOfferForm>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default InternshipOffers;
