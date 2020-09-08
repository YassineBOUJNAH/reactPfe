import React from "react"; 
import Button1 from "./button1" ; 
import { Button, Modal, ModalHeader, ModalBody, FormFeedback, Form, Input, FormGroup, Label, Row, Table, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';



class Students extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            utilisateurs: [],
            isModalOpen: false,
            isProfilModalOpen: false,
            addusername: '',
            addpassword: '',
            addType: 'CLIENT',
            selectedUser: null,
            touched: {
                addusername: false,
                addpassword: false,
                addType: false
            }

        };  
        this.addhandleBlur = this.addhandleBlur.bind(this); 
        this.addhandleInputChange = this.addhandleInputChange.bind(this); 
        this.toggleModal = this.toggleModal.bind(this);
    }  

    
    addhandleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }   

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
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

        if(this.state.utilisateurs){
        if (this.state.touched.addusername && addusername.length < 4)
            errors.addusername = 'Username should be >= 4 characters';
        if (this.state.touched.addpassword && addpassword.length < 4)
            errors.addpassword = 'password should be >=  characters';
        if (this.state.utilisateurs.filter(utilisateur => utilisateur.username === this.state.addusername)[0])
            errors.addusername = 'username already exist';
        }
        return errors;


    }
  render() { 
    const errors = this.addvalidate(this.state.addusername, this.state.addpassword);
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Students </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Id</th>
                        <th>name</th>
                        <th>last name</th>
                        <th>CNE</th>  
                        <th>Intership details</th>  
                        <th>Demand a meeting</th> 

                      </tr>
                    </thead>
                    <tbody> 



                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td>$36,738</td>  
                        <td> <Button1 name ="Internship" onclick = {this.toggleModal}/></td>  
                        <td> <Button1 name ="demand" /> </td> 
                       
                      </tr>
                     
                    
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
         
          </Row> 

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Ajouter un nouveau utilisateur</ModalHeader>
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
                                    <Label htmlFor="addType">Role</Label>
                                    <Input type="select" name="addType"
                                        value={this.state.addType}
                                        onChange={this.addhandleInputChange}>
                                        <option>CLIENT</option>
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

export default Students ;
