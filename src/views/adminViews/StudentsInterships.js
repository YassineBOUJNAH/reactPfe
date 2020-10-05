import React from 'react'
import { Card, CardHeader, Row, CardBody, Col, Table, CardTitle,Button } from "reactstrap";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert"; 
import StudentModal from "../supervisorViews/studentModal" ; 




class StudentsInterships extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            internships: [],
    
        };
    }



    componentDidMount() {
        const token = sessionStorage.getItem('jwt');

        fetch("http://localhost:8081/internships/", {
            headers: { 'Authorization': token }
        })
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    this.setState({
                        internships: data
                    });
                },
                (error) => {

                }
            )

    }

    render() {

        let studentcomp;

        if (this.state.selectedinternship == null) {
            studentcomp = null;

        } else {


            studentcomp = <StudentModal isopen={this.state.isStudentModalOpen} togglemodal={this.toggleModalS2} internship={

                this.state.internships.filter(internship => internship.id == this.state.selectedinternship)

            } />

        }

        return (
            <>
                <div className="content">
                    <NotificationAlert ref={this.notificationAlert} />
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Internships</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Id</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Start date</th>
                                                <th>End date</th>
                                                <th>Entreprise</th>
                                                <th>Student</th>
                                                <th>Supervisor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.internships.map((internship) =>

                                                    <tr>
                                                        <td>{internship.id}</td>
                                                        <td>{internship.title}</td>
                                                        <td>{internship.description}</td>
                                                        <td>{internship.startdate}</td>
                                                        <td>{internship.lasttdate}</td>
                                                        <td>{internship.entreprise}</td>
                                                        <td>{internship.student.username}</td>
                                                        <td>{internship.supervisor.username}</td>
                                                    </tr>
                                                )}
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
export default StudentsInterships;