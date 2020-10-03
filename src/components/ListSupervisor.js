import React, { Component } from 'react';
import { SERVER_URL } from '../variables/general'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row
} from 'reactstrap';
import NewSupervisorForm from '../components/NewSupervisorForm'

function RenderSupervisorItem({ supervisor }) {
    return (
        <Card className="col-8 col-md-3 m-1 col-lg-2">
            <CardImg top width="100%" src={require("assets/img/adminProfile.png")} alt="Card image cap" />
            <CardBody>
                <CardTitle>{supervisor.username}</CardTitle>
                <CardSubtitle>{supervisor.fullname}</CardSubtitle>
                <CardText>{supervisor.phone}</CardText>
            </CardBody>
        </Card>
    );
}

class ListSupervisor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            supervisors: [],
            isAddSupervisorModalOpen: false,
        };

        this.fetchSupervisors = this.fetchSupervisors.bind(this);
        this.addSupervisorModalOpen = this.addSupervisorModalOpen.bind(this);
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

    componentDidMount() {
        this.fetchSupervisors();
    }
    addSupervisorModalOpen() {
        this.setState({
            isAddSupervisorModalOpen: !this.state.isAddSupervisorModalOpen,
        });
    }

    render() {


        const menu = this.state.supervisors.map((supervisor) => {
            return (
                <RenderSupervisorItem supervisor={supervisor} />
            );
        });

        return (
            <div className="content">
                <h4>Supervisor </h4>
                <hr />
                <NewSupervisorForm fetchSupervisors={this.fetchSupervisors} isOpen={this.state.isAddSupervisorModalOpen} toggle={this.addSupervisorModalOpen} /> 
                <Button variant='raised'
                    color='primary'
                    style={{ 'margin': '10px' }}
                    onClick={() => this.addSupervisorModalOpen()}>
                    New Supervisor</Button>
                <Row>
                    {menu}</Row>
            </div>);
    }
}

export default ListSupervisor;