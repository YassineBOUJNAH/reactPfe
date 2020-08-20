import React from 'react';
import { Row, Table, Col, Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


class Utilisateurs extends React.Component {

    constructor(props) {
        super(props);
        this.state = { utilisateurs: [] };
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
                                        <Link className=" ml-auto mr-4" color="secondary">
                                            <i className="fa fa-plus-square" /><span> ajouter</span>
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
                </div>
            </>
        );
    }

}

export default Utilisateurs;