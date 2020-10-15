import React from 'react';
import SERVER_URL from '../variables/general';
import { Button, Modal, ModalHeader, ModalBody, FormFeedback, Form, Input, FormGroup, Label } from 'reactstrap';
import { toast } from 'react-toastify';

class NewSupervisorForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            utilisateurs: [],
            addusername: '',
            addpassword: '',
            addType: 'SUPERVISOR',
            email: '',
            frstname: '',
            lastname: '',
            address: '',
            phone: '',
            sexe: 'M',
            speciality:'',

            touched: {
                addusername: false,
                addpassword: false,
            }

        };
        this.addhandleInputChange = this.addhandleInputChange.bind(this);
        this.addhandleSubmit = this.addhandleSubmit.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.addvalidate = this.addvalidate.bind(this);
    }

    addhandleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
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
        if (this.state.utilisateurs != null && this.state.utilisateurs.filter(utilisateur => utilisateur.username === this.state.addusername)[0])
            errors.addusername = 'username already exist';

        return errors;

    }

    componentDidMount() {
        this.fetchUsers();
    }

    // Fetch all Users
    fetchUsers = () => {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL + 'users', {
            headers: { 'Authorization': token }
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    utilisateurs: responseData,
                });
            })
            .catch(err => console.error(err));
    }
    addhandleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    addUser(user) {
        const token = sessionStorage.getItem('jwt');
        fetch(SERVER_URL + "addsupervisor",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(user)
            })
            .then(res =>
                toast.success('Changes saved', {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            ).then(res => this.props.fetchSupervisors())
            .catch(err =>
                toast.error('Error when saving', {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
               
    }
    addhandleSubmit(event) {
        event.preventDefault();

        const errors = this.addvalidate(this.state.addusername, this.state.addpassword);
        if (errors.addusername === '' && errors.addpassword === '' && this.state.addusername !== '' && this.state.addpassword !== '') {
            const user = {
                username: this.state.addusername,
                password: this.state.addpassword,
                role: this.state.addType,
                email: this.state.email,
                frstname: this.state.frstname,
                lastname: this.state.lastname,
                address: this.state.address,
                phone: this.state.phone,
                sexe: this.state.sexe,
                speciality: this.state.speciality
            };
            console.log(user);
            this.addUser(user);
            this.setState({
                addusername: '',
                addpassword: '',
                addType: 'ADMIN',
                email: '',
                frstname: '',
                lastname: '',
                address: '',
                phone: '',
                sexe: 'M',
                speciality:''
            });
            this.props.toggle();
        }
    }

    render() {
        const errors = this.addvalidate(this.state.addusername, this.state.addpassword);
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Add new Supervisor</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.addhandleSubmit}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="addusername" name="addusername"
                                    innerRef={(input) => this.username = input}
                                    value={this.state.addusername}
                                    valid={errors.addusername === '' && this.state.addusername !== ''}
                                    invalid={errors.addusername !== ''}
                                    onBlur={this.addhandleBlur('addusername')}
                                    onChange={this.addhandleInputChange} />
                                <FormFeedback>{errors.addusername}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="addpassword" name="addpassword"
                                    innerRef={(input) => this.password = input}
                                    value={this.state.addpassword}
                                    valid={errors.addpassword === '' && this.state.addpassword !== ''}
                                    invalid={errors.addpassword !== ''}
                                    onBlur={this.addhandleBlur('addpassword')}
                                    onChange={this.addhandleInputChange} />
                                <FormFeedback>{errors.addpassword}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="speciality">Speciality</Label>
                                <Input type="text" id="speciality" name="speciality"
                                    value={this.state.speciality}
                                    onChange={this.addhandleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" name="email"
                                    value={this.state.fullname}
                                    onChange={this.addhandleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="frstname">Firstname</Label>
                                <Input type="text" id="frstname" name="frstname"
                                    value={this.state.jobTitle}
                                    onChange={this.addhandleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">Lastname</Label>
                                <Input type="text" id="lastname" name="lastname"
                                    value={this.state.jobTitle}
                                    onChange={this.addhandleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="address">Address</Label>
                                <Input type="text" id="address" name="address"
                                    value={this.state.jobTitle}
                                    onChange={this.addhandleInputChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="sexe">Gender</Label>
                                <Input type="select" id="sexe" name="sexe"
                                    value={this.state.sexe}
                                    onChange={this.addhandleInputChange} >
                                <option>F</option>
                                <option>M</option>
                                </Input>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Ajouter</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );

    }
}

export default NewSupervisorForm;