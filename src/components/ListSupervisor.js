import React, { Component } from 'react';
import  SERVER_URL  from '../variables/general'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row,CardHeader,CardFooter
} from 'reactstrap';
import NewSupervisorForm from '../components/NewSupervisorForm'
import { Link } from 'react-router-dom';


function RenderSupervisorItem({ supervisor }) {
    return (
        <Card className="col-8 col-md-3 m-1 col-lg-2">
            <CardImg top width="100%" src={require("assets/img/default-avatar.png")} alt="Card image cap" />
            <CardBody>
                <CardTitle tag="h6">{supervisor.username}</CardTitle>
                <CardSubtitle>{supervisor.frstname + "  " + supervisor.lastname}</CardSubtitle>
            </CardBody>
            <CardFooter className="text-muted">{supervisor.speciality}</CardFooter>
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
                <NewSupervisorForm fetchSupervisors={this.fetchSupervisors} isOpen={this.state.isAddSupervisorModalOpen} toggle={this.addSupervisorModalOpen} /> 

                    <CardHeader>
                            <CardTitle tag="h4"><Row className="mx-2">Supervisors List
                                        <Link onClick={() => this.addSupervisorModalOpen()} className=" ml-auto mr-4 btn-sm" color="secondary">
                                    <i className="fa fa-plus-square " /><span > Add</span>
                                </Link></Row>
                            </CardTitle>
                    </CardHeader>
                    <CardBody>
                <Row>
                    {menu}</Row></CardBody>
            </div>);
    }
}

export default ListSupervisor;