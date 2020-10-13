import React from 'react'
import ReactTable from 'react-table';
import { SERVER_URL } from '../variables/general';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Card, CardTitle, CardHeader, CardBody, Row } from 'reactstrap'
import NewStudentForm from '../components/NewStudentForm';
import ListSupervisor from '../components/ListSupervisor';
import { Link } from 'react-router-dom';




class UsersManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            isAddStudentModalOpen: false,
            selectedUser: null,
            selectedLink: null,
        };

        this.addStudentToggleModal = this.addStudentToggleModal.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);

    }

    componentDidMount() {
        this.fetchStudents();
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

    // Update Student
    updateStudent(student, link) {
        const token = sessionStorage.getItem('jwt');
        fetch(link,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify(student)
            })
            .then(res =>
                toast.success('Changes saved', {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
            .catch(err =>
                toast.error('Error when saving', {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }
    renderEditable = (cellInfo) => {
        return (
            <div
                spellcheck="false"
                style={{ backgroundColor: '#fafafa' }}
                contentEditable
                suppressContentEditableWarning
                suppressHydrationWarning
                warn
                onBlur={e => {
                    const data = [...this.state.students];
                    data[cellInfo.index][cellInfo.column.id] =
                        e.target.innerHTML;
                    this.setState({ students: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.students[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    addStudentToggleModal() {
        this.setState({
            isAddStudentModalOpen: !this.state.isAddStudentModalOpen,
        });
    }

    render() {

        const columns = [{
            Header: 'Username',
            accessor: 'username'
        }, {
            Header: 'CNE',
            accessor: 'cne',
            Cell: this.renderEditable,
        }, {
            Header: 'Email',
            accessor: 'email',
            Cell: this.renderEditable,
        }, {
            Header: 'Firstname',
            accessor: 'frstname',
            Cell: this.renderEditable,
            minWidth: 150,
        }, {
            Header: 'Lastname',
            accessor: 'lastname',
            Cell: this.renderEditable
        }, {
            Header: 'Address',
            accessor: 'address',
            Cell: this.renderEditable
        }, {
            Header: 'Phone',
            accessor: 'phone',
            Cell: this.renderEditable
        }, {
            Header: 'Gender',
            accessor: 'sexe',
            height: "2px",
            Cell: this.renderEditable,
        }, {
            id: 'savebutton',
            sortable: false,
            filterable: false,
            accessor: '_links.self.href',
            Cell: ({ value, row }) =>
                (<button style={{ 'margin': '0px' }} className="btn btn-sm" onClick={() => { this.updateStudent(row, value) }}>
                    Save</button>)
        }]
        return (
            <div className='content'>
                <Card>
                        <CardHeader>
                            <CardTitle tag="h4"><Row className="mx-2">Students table
                                        <Link onClick={() => this.addStudentToggleModal()} className=" ml-auto mr-4 btn-sm" color="secondary">
                                    <i className="fa fa-plus-square " /><span > Add</span>
                                </Link></Row>
                            </CardTitle>
                    </CardHeader>
                    <hr />
                    <CardBody>
                        <ReactTable data={this.state.students} columns={columns}
                            defaultPageSize={6}
                            filterable={true} />
                    </CardBody>
                </Card>
                <ToastContainer autoClose={1500} />
                <NewStudentForm fetchStudents={this.fetchStudents} isOpen={this.state.isAddStudentModalOpen} toggle={this.addStudentToggleModal} />
                <Card>

                    <CardBody>
                        <ListSupervisor />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default UsersManagement;