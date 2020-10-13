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
            isAccepteOpen: false,
            description: '',
            supervisors: [],
            selectedSupervisor: '',
            students: [],
            acceptedIntership: '',
            link: '',
        };

        this.fetchintershipOffers = this.fetchintershipOffers.bind(this);
        this.refuseOffer = this.refuseOffer.bind(this);
        this.accepteToggle = this.accepteToggle.bind(this);
        this.toggle = this.toggle.bind(this);
        this.addhandleInputChange = this.addhandleInputChange.bind(this);
        this.addhandleAccepteSubmit = this.addhandleAccepteSubmit.bind(this);
        this.addhandleSubmit= this.addhandleSubmit.bind(this);
        this.fetchSupervisors = this.fetchSupervisors.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);

    }

    fetchStudents = () => {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL + 'api/students', {
            headers: { 'Authorization': token }
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    students: responseData._embedded.students,
                });
            })
            .catch(err => console.error(err));
    }

    fetchSupervisors = () => {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL + 'api/supervisors', {
            headers: { 'Authorization': token }
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    supervisors: responseData._embedded.supervisors,
                });
            })
            .catch(err => console.error(err));
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

    accepteToggle() {
        this.setState({
            isAccepteOpen: !this.state.isAccepteOpen,
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
        const startDate = intershipOffer.startdate;
        const endDate = intershipOffer.lasttdate;

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
                            <Button onClick={() => {
                                this.accepteToggle();
                                this.setState({
                                    acceptedIntership: intershipOffer,
                                });
                            }} color="primary" className="col-12 col-md-5">Accept</Button>
                            <Button onClick={() => {
                                this.toggle();
                                this.setState({
                                    link: intershipOffer._links.self.href,
                                });
                            }} color="danger" className="col-12 col-md-5">Refuse</Button>
                        </CardBody>
                        <CardFooter className="text-muted"><div>start: {startDate.substring(0, 10)} end: {endDate.substring(0, 10)}</div>{intershipOffer.entreprise} </CardFooter>
                    </Card>
                </FadeTransform>
            </div>
        );
    }

    refuseOffer = (link, description) => {
        const token = sessionStorage.getItem('jwt');
        const internshipOffer = { state: 'refused', response: description }
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

    AccepteOffer = (intershipOffer, Affectedsupervisor) => {
        const token = sessionStorage.getItem('jwt');
        const internshipOffer = { state: 'Accepted' }
        fetch(intershipOffer._links.self.href,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(internshipOffer)
            }).then(res => {
                const affetedSupervisor = this.state.supervisors.filter(supervisor => supervisor.username === Affectedsupervisor)[0]
                const affetedStudent = this.state.students.filter(student => student.username === intershipOffer.studentUsername)[0]
                const intership = {
                    title : intershipOffer.title,
                    entreprise : intershipOffer.entreprise,
                    description : intershipOffer.description,
                    startdate : intershipOffer.startdate,
                    lasttdate : intershipOffer.lasttdate,
                    supervisor : affetedSupervisor._links.self.href,
                    student : affetedStudent._links.self.href,
                };
                fetch(SERVER_URL + 'api/internships',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        },
                        body: JSON.stringify(intership)
                    }).then(res => {console.log(intership);
                        this.notify("tc", "success", "intership offer has been Accepted");
                        this.fetchintershipOffers();

                    })          
                      .catch(err => console.log(err)
                    )
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
        this.fetchSupervisors();
        this.fetchStudents();
    }

    addhandleSubmit(event) {
        event.preventDefault();
        this.refuseOffer(this.state.link, this.state.description);
        this.toggle();
    }

    addhandleAccepteSubmit(event) {
        event.preventDefault();
        this.AccepteOffer(this.state.acceptedIntership,this.state.selectedSupervisor);
        this.accepteToggle();
    }
    render() {

        const offersList = this.state.intershipOffers.map((intershipOffer) => {
            if (intershipOffer.state === "inProgress")
                return (
                    this.RenderIntershipOfferItem(intershipOffer)
                );
        });
        const supervisorsList = this.state.supervisors.map((supervisor) => {
                return (
                    <option>{supervisor.username}</option>
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
                                <CardTitle tag="h4">New Internships Offers</CardTitle>
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

                <Modal isOpen={this.state.isAccepteOpen} toggle={this.accepteToggle}>
                    <ModalHeader toggle={this.state.accepteToggle}>Accepte Intership offer</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.addhandleAccepteSubmit}>
                            <FormGroup>
                                <Label htmlFor="selectedSupervisor">Select supervisor</Label>
                                <Input type="select" id="selectedSupervisor" name="selectedSupervisor"
                                    value={this.state.selectedSupervisor}
                                    onChange={this.addhandleInputChange} >
                                    <option></option>
                                    {supervisorsList}
                                </Input>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Confirme</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default IntershipsOffers;