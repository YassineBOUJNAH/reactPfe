import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, Input,
     FormGroup,  Button,
     Card,
     CardHeader,
     CardBody,
     CardTitle,
     Row,
     Col, } from 'reactstrap';

class profileModal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (

            <Modal size="lg" isOpen={this.props.isModalOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>

                </ModalHeader>

                <ModalBody>
                    <Card className="card-user">
                        <CardHeader>
                            <CardTitle tag="h5">Edit Profile</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <Row>
                                    <Col className="pr-1" md="5">
                                        <FormGroup>
                                            <label>Company (disabled)</label>
                                            <Input
                                                defaultValue="Yassine Inc."
                                                disabled
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="px-1" md="3">
                                        <FormGroup>
                                            <label>Username</label>
                                            <Input
                                                defaultValue=""
                                                placeholder="Username"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-1" md="4">
                                        <FormGroup>
                                            <label htmlFor="exampleInputEmail1">
                                                Email address
                          </label>
                                            <Input placeholder="Email" type="email" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-1" md="6">
                                        <FormGroup>
                                            <label>First Name</label>
                                            <Input
                                                defaultValue=""
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-1" md="6">
                                        <FormGroup>
                                            <label>Last Name</label>
                                            <Input
                                                defaultValue=""
                                                placeholder="Last Name"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <label>Address</label>
                                            <Input
                                                defaultValue=""
                                                placeholder="Home Address"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-1" md="4">
                                        <FormGroup>
                                            <label>City</label>
                                            <Input
                                                defaultValue=""
                                                placeholder="City"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="px-1" md="4">
                                        <FormGroup>
                                            <label>Country</label>
                                            <Input
                                                defaultValue=""
                                                placeholder="Country"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pl-1" md="4">
                                        <FormGroup>
                                            <label>Postal Code</label>
                                            <Input placeholder="ZIP Code" type="number" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="update ml-auto mr-auto">
                                        <Button
                                            className="btn-round"
                                            color="primary"
                                            type="submit"
                                        >
                                            Update Profile
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
        )
    }
}

export default profileModal;