import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, Input,FormGroup,Label,Row, Table, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';


class Utilisateurs extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            utilisateurs: [] ,
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);

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


    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
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
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                </div>
            </>
        );
    }

}

export default Utilisateurs;