import React from "react";
import { SERVER_URL } from '../../variables/general'
import { FadeTransform } from 'react-animation-components';
import NotificationAlert from "react-notification-alert";
import { Modal, ModalHeader, ModalBody, Form, Input, FormGroup, Label } from 'reactstrap';


// reactstrap components
import { Card, CardHeader, Row, CardBody, Col, Table, CardFooter, CardTitle, CardText, Button } from "reactstrap";





function RenderIntershipOffertable({ intershipOffer }) {
    return (
        <tr>
            <td>{intershipOffer.title}</td>
            <td>{intershipOffer.studentUsername}</td>
            <td>{intershipOffer.entreprise}</td>
            <td>{intershipOffer.description}</td>
            <td>{intershipOffer.response}</td>
        </tr>
    );
}

class IntershipsOffers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            intershipOffers: [],
            isOpen: false,
            description: '',
            link:'',
        };

        this.fetchintershipOffers = this.fetchintershipOffers.bind(this);
        this.refuseOffer = this.refuseOffer.bind(this);
        this.toggle = this.toggle.bind(this);
        this.addhandleInputChange = this.addhandleInputChange.bind(this);
        this.addhandleSubmit = this.addhandleSubmit.bind(this);

    }

    addhandleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    // // // Notification  
    notificationAlert = React.createRef();

    notify(place, type, message) {

        var type = type;

        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        {message}
                    </div>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7,
        };
        this.notificationAlert.current.notificationAlert(options);
    }

    RenderIntershipOfferItem(intershipOffer) {
        return (
            <div className="col-11 col-md-5 m-3">
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'translateX(-100px)'
                    }}
                    fadeProps={{
                        enterOpacity: 0.85,
                    }}>
                    <Card style={{ backgroundColor: '#f2ecba', borderColor: '#333' }}>
                        <CardHeader tag="h5">{intershipOffer.studentUsername}</CardHeader>
                        <CardBody>
                            <CardTitle tag="h6">{intershipOffer.title}</CardTitle>
                            <CardText>{intershipOffer.description}</CardText>
                            <Button color="primary" className="col-12 col-md-5">Accepte</Button>
                            <Button onClick={() => {
                                this.toggle();
                                this.setState({
                                    link:intershipOffer._links.self.href,
                                });
                            }} color="danger" className="col-12 col-md-5">Refuse</Button>
                        </CardBody>
                        <CardFooter className="text-muted">{intershipOffer.entreprise}</CardFooter>
                    </Card>
                </FadeTransform>
            </div>
        );
    }

    refuseOffer = (link,description) => {
        const token = sessionStorage.getItem('jwt');
        const internshipOffer = { state: 'refused',response: description }
        fetch(link,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(internshipOffer)
            }).then(res => {
                this.fetchintershipOffers();
                this.notify("tc", "success", "intership offer has been refused");
            }

            )
            .catch(err => console.log(err)
            )

    }
    fetchintershipOffers = () => {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL + 'api/internshipOffers', {
            headers: { 'Authorization': token }
        })
            .then((response) => response.json())
            .then((responseData) => {

                this.setState({
                    intershipOffers: responseData._embedded.internshipOffers,
                });
            })
            .catch(err => console.error(err));
    }


    componentDidMount() {
        this.fetchintershipOffers();
    }

    addhandleSubmit(event) {
       event.preventDefault();
       this.refuseOffer(this.state.link,this.state.description);
       this.toggle();
    }

    render() {

        const offersList = this.state.intershipOffers.map((intershipOffer) => {
            if (intershipOffer.state === "inProgress")
                return (
                    this.RenderIntershipOfferItem(intershipOffer)
                );
        });

        const declinedOffersList = this.state.intershipOffers.map((intershipOffer) => {
            if (intershipOffer.state === "refused")
                return (
                    <RenderIntershipOffertable intershipOffer={intershipOffer} />
                );
        });

        return (
            <div className="content">
                <NotificationAlert ref={this.notificationAlert} />
                <Row>
                    <Col md="12">
                        <Card >
                            <CardHeader>
                                <CardTitle tag="h4">New Interships Offers</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    {offersList}
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Refused offers</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Title</th>
                                            <th>Student</th>
                                            <th>Entreprise</th>
                                            <th>description</th>
                                            <th>refuse reason</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {declinedOffersList}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Add new Supervisor</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.addhandleSubmit}>
                            <FormGroup>
                                <Label htmlFor="description">Refuse description</Label>
                                <Input type="textarea" id="description" name="description"
                                    value={this.state.description}
                                    onChange={this.addhandleInputChange} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Refuse</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default IntershipsOffers;