import React, { Component } from "react";
import { Button, Form, FormGroup, Alert, Label, Container, Input, Jumbotron, Col, FormFeedback } from 'reactstrap';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            touched: {
                username: false,
                password: false
            },
            alertVisible:false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.login = this.login.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
        this.fetchCurrentUser = this.fetchCurrentUser.bind(this);

    }

    login = () => {
        const user = { username: this.state.username, password: this.state.password };
        fetch('http://localhost:8081/login', {
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(res => {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem('jwt', jwtToken);
                    this.setState({isAuthenticated: true});
                    this.fetchCurrentUser();
                    window.location.reload(false);
                }
                else{
                    this.toggleAlert()
                }
            })
            .catch(err => console.error(err))
    }

    
    // Fetch all Users
    fetchCurrentUser = () => {
        const token = sessionStorage.getItem('jwt');
        fetch('http://localhost:8081/Current', {
            headers: { 'Authorization': token }
        })
            .then((response) => response.json())
            .then((res) => {
                sessionStorage.setItem('role', res.role);
          })
            .catch(err => console.error(err));
    }

    toggleAlert(){
        this.setState({
            alertVisible: !this.state.alertVisible
        });    
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    handleSubmit(event) {
        console.log("Current State is:" + JSON.stringify(this.state))
//        alert("Current State is:" + JSON.stringify(this.state))
        event.preventDefault();
        const errors = this.validate(this.state.username, this.state.password);
        if(errors.username === '' && errors.password === '')
        this.login();
        else
        this.toggleAlert();
    }


    validate(username, password) {
        const errors = {
            username: '',
            password: ''
        };


        if (this.state.touched.username && username.length < 4)
            errors.username = 'username should be >= 4 characters';
        if (this.state.touched.password && password.length < 4)
            errors.password = 'password should be >= 4 characters';

        return errors;

    }

    render() {
        const errors = this.validate(this.state.username, this.state.password);
        return (
            <div className="container">
                <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.toggleAlert}>
                    Merci de bien verifier les champs
                </Alert>
                
                <div className="row ">
                    <Jumbotron className="mt-3 mx-auto col-md-9 col-13">
                        <Container >
                            <h1 className="display-3 ml-4">Bienvenue</h1>
                            <p className="lead  ml-4">Si vous êtes besoin d'un compte, vous pouvez le demander à un administrateur</p>
                            <Form onSubmit={this.handleSubmit} className="m-4">
                                <FormGroup row>
                                    <Label htmlFor="username" md={2}>Username</Label>
                                    <Col md={9}>
                                        <Input type="text" id="username" name="username"
                                            placeholder="Username"
                                            value={this.state.username}
                                            invalid={errors.username !== ''}
                                            onBlur={this.handleBlur('username')}
                                            onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.username}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="password" md={2}>Password</Label>
                                    <Col md={9}>
                                        <Input type="password" id="password" name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            invalid={errors.password !== ''}
                                            onBlur={this.handleBlur('password')}
                                            onChange={this.handleInputChange} />
                                        <FormFeedback>{errors.password}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type="submit" color="primary">
                                            Login
                                    </Button>
                                    </Col>
                                </FormGroup>

                            </Form>

                        </Container>
                    </Jumbotron>
                </div>
                {/* <div className="row row-content">
                    <div className="col-11 col-lg-6 col-md-9 mx-auto  bg-light rounded"> */}


            </div>
        );
    }
}