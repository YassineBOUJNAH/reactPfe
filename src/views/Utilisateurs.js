import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormFeedback,Form, Input, FormGroup, Label, Row, Table, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';


class Utilisateurs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            utilisateurs: [],
            isModalOpen: false,
            addusername: '',
            addpassword: '',
            addType: 'USER',
            touched: {
                addusername: false,
                addpassword: false,
                addType: false
            }

        };

        this.addhandleSubmit = this.addhandleSubmit.bind(this);
        this.addhandleInputChange = this.addhandleInputChange.bind(this);
        this.addhandleBlur = this.addhandleBlur.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.checkUser = this.checkUser.bind(this);

    }

    addhandleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    addhandleSubmit(event) {
        console.log("Current State is:" + JSON.stringify(this.state))
        alert("Current State is:" + JSON.stringify(this.state))
        event.preventDefault();
    }

    addhandleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    addvalidate(addusername, addpassword) {
        const errors = {
            addusername: '',
            addpassword: '',
        };

        if (this.state.touched.addusername && addusername.length < 4)
            errors.addusername = 'Username should be >= 4 characters';
        if (this.state.touched.addpassword && addpassword.length < 4)
            errors.addpassword = 'password should be >=  characters';
        if (this.state.utilisateurs.filter(utilisateur => utilisateur.username == this.state.addusername)[0])
            errors.addusername = 'username already exist';

        return errors;


    }

    checkUser(username){
        return (username == this.state.addusername);
    }

    componentDidMount() {
        this.fetchUsers();
    }

    // Fetch all Users
    fetchUsers = () => {
        const token = sessionStorage.getItem('jwt');
        fetch('http://localhost:8081/api/utilisateurs', {
            headers: { 'Authorization': token }
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    utilisateurs: responseData._embedded.utilisateurs,
                });
            })
            .catch(err => console.error(err));
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        const errors = this.addvalidate(this.state.addusername, this.state.addpassword);
        const tableRows = this.state.utilisateurs.map((utilisateur, index) =>
            <tr key={index}>
                <td>{utilisateur.username}</td>
                <td>{utilisateur.role}</td>
                <td className="text-right"><Button color="secondary">Voir Profile</Button></td>
            </tr>);

        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4"><Row className="mx-2">Table d'utilisateurs
                                        <Link onClick={this.toggleModal} className=" ml-auto mr-4" color="secondary">
                                            <i className="fa fa-plus-square" /><span> Ajouter</span>
                                        </Link></Row>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>UserName</th>
                                                <th>Role</th>
                                                <th className="text-right">Afficher Profil</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableRows}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Ajouter un nouveau utilisateur</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="addusername" name="addusername"
                                        innerRef={(input) => this.username = input} 
                                        value={this.state.addusername}
                                        invalid={errors.addusername !== ''}
                                        onBlur={this.addhandleBlur('addusername')}
                                        onChange={this.addhandleInputChange}/>
                                        <FormFeedback>{errors.addusername}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="addpassword" name="addpassword"
                                        innerRef={(input) => this.password = input} 
                                        value={this.state.addpassword}
                                        invalid={errors.addpassword !== ''}
                                        onBlur={this.addhandleBlur('addpassword')}
                                        onChange={this.addhandleInputChange}/>
                                        <FormFeedback>{errors.addpassword}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="addType">Role</Label>
                                    <Input type="select" name="addType"
                                        value={this.state.addType}
                                        onChange={this.addhandleInputChange}>
                                        <option>USER</option>
                                        <option>ADMIN</option>
                                    </Input>
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Ajouter</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                </div>
            </>
        );
    }

}

export default Utilisateurs;