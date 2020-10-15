import React from "react"; 
import Button1 from "./button1" ; 
import { Button, Modal, ModalHeader , ModalFooter , ModalBody, FormFeedback, Form, Input, FormGroup, Label, Row, Table, Col, Card, CardHeader, CardTitle, CardBody,  UncontrolledAlert, Alert  } from 'reactstrap';
import StudentModal from "./studentModal.js" ;  
import SERVER_URL from "../../variables/general";



// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";




class Meetings extends React.Component {  

 
    constructor(props) {
        super(props);
        this.state = {
            internships: [],
            isModalOpen: false, 
            isStudentModalOpen : false , 
            isProfilModalOpen: false, 
            isConfimationModalOpen : false , 
            adddescription : '',
            addplace : '', 
            adddate : '' ,    
            errors : { 
               description : '' , 
               place : '' , 
               date : '' , 
            } , 
            selectedinternship: null,  
            touched: {
                adddescription: false,
                addplace: false 
            }  
           
    
        };   

        this.addhandleBlur = this.addhandleBlur.bind(this); 
        this.addhandleInputChange = this.addhandleInputChange.bind(this);  
        this.addhandleSubmit = this. addhandleSubmit.bind(this);                       
        this.toggleModal = this.toggleModal.bind(this);  
        this.toggleModal2 = this.toggleModal2.bind(this);
        this.toggleModalS = this.toggleModalS.bind(this); 
        this.toggleModalS2 = this.toggleModalS2.bind(this);  
        this.cancelMeetingModal = this.cancelMeetingModal.bind(this); 
        this.toggleCancelMeetingModal = this.toggleCancelMeetingModal.bind(this)

    }    


    UpdateMeetingModal(internship){  

         if(internship == null) { 
             return(<h1></h1>);
         }else{

        return (  

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal2}>
            <ModalHeader toggle={this.toggleModal2}>UPDATE MEETING</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.addhandleSubmit}>
                    <FormGroup>
                        <Label htmlFor="description">Description</Label>
                        <Input type="textarea" id="adddescription" name="adddescription"
                            innerRef={(input) => this.description = input}
                            invalid={this.state.errors.description !== ''}
                            onBlur={this.addhandleBlur('adddescription')}
                            onChange={this.addhandleInputChange}      
                            value={this.state.adddescription}      
                                
                                                         
                            /> 
                           
                        <FormFeedback>{this.state.errors.description}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="place">Place</Label>
                        <Input type="text" id="addplace" name="addplace"
                            innerRef={(input) => this.place = input}
                            invalid={this.state.errors.place !== ''}
                            onBlur={this.addhandleBlur('addplace')}
                            onChange={this.addhandleInputChange}   
                            value = { this.state.addplace}
                           
                            
                            />
                        <FormFeedback>{this.state.errors.place}</FormFeedback>
                    </FormGroup> 
                    <FormGroup>
                        <Label htmlFor="date">Date</Label>
                         <Input type="datetime-local"   id="adddate" name="adddate"  
                                innerRef={(input) => this.date = input}
                                invalid={!this.state.adddate}
                                onBlur={this.addhandleBlur('adddate')}
                                onChange={this.addhandleInputChange} 
                                style={{backgroundImage : "none"}} 
                                value={this.state.adddate}   
                         />   
                                                
                          <FormFeedback>{this.state.errors.date}</FormFeedback>
                    </FormGroup> 
                    <Button  type="submit" value="submit" color="primary" >SEND</Button>
                </Form>
            </ModalBody>
        </Modal>   
            



         );}
    }
 

    // // // Notification  
     notificationAlert = React.createRef(); 

     notify(place , type , message) {

      var type = type ; 
      
      var options = {};
      options = {
        place: place,
        message: (
          <div>
            <div>
                 {message}
            </div>
          </div>
        ),
        type: type,
        icon: "nc-icon nc-bell-55",
        autoDismiss: 7,
      };
      this.notificationAlert.current.notificationAlert(options);
    } 

    // // // // // // // // // 

     //Consuming the REST API 
   
      componentDidMount() { 
         
        this.getData() ;
          
      }    
      
      

      validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          // if we have an error string set valid to false
          (val) => val.length > 0 && (valid = false)
        ); 

        if(!this.state.adddate || !this.state.adddescription || !this.state.adddate){  
                valid =  false ;   

        }
        return valid;
      } 
     

      getData(){ 
        const token  = sessionStorage.getItem('jwt');  
        const currentuser =  JSON.parse(sessionStorage.getItem('currentuser')); 
          
      fetch(SERVER_URL+"supervisor/"+currentuser.id+"/internships", {
        headers: { 'Authorization': token }
      })
        .then(res => res.json())
        .then(
          (data) => { 
            console.log(data); 
              this.setState({ internships : data });
          },
          (error) => {
               
          }
        ) 
      }  


      cancelMeetingModal(id){ 

         this.setState({ selectedinternship : id } , () =>this.toggleCancelMeetingModal());

      } 

      toggleCancelMeetingModal(){ 
         this.setState({ isConfimationModalOpen : !this.state.isConfimationModalOpen})  
         
      }

      cancelMeeting(id){  
  
        const token  = sessionStorage.getItem('jwt');    

        fetch(SERVER_URL+"internships/cancelmeeting/"+this.state.selectedinternship , {  
          method : 'PUT' , 
          headers: { 'Authorization': token ,  
                     'Accept' : 'Application/json' , 
                     'Content-Type' : 'application/json'
          } , 
       
        })
          .then((response) => { 
            if (response.status >= 200 && response.status <= 299) {   

              this.toggleCancelMeetingModal();
              this.notify("tc","success", "Meeting demand canceled !"); 
              this.getData();
              return response.json();
            } else {  
             
              throw "Something went wrong , error status : " + response.status ;  
            }
          })
           .catch((error) => {  
              
           this.notify("tc","danger" , error); 
         

           }); 
        

      }


      addhandleSubmit(event){   
       
         this.toggleModal2() ; 

        if(this.validateForm(this.state.errors)) {
          
        
       var data = { 'description' : this.state.adddescription , 'datetime' : this.state.adddate ,  'place' : this.state.addplace }
        console.log(JSON.stringify(data)); 

        const token  = sessionStorage.getItem('jwt');    

        fetch("http://localhost:8081/internships/"+this.state.selectedinternship , {  
          method : 'PUT' , 
          headers: { 'Authorization': token ,  
                     'Accept' : 'Application/json' , 
                     'Content-Type' : 'application/json'
          } , 
          body : JSON.stringify(data)
        })
          .then((response) => { 
            if (response.status >= 200 && response.status <= 299) { 
              this.notify("tc","success", "Meeting demand updated successfully"); 
              this.getData();
              return response.json();
            } else {  
             
              throw "Something went wrong , error status : " + response.status ;  
            }
          })
           
           .catch((error) => {  
              
           this.notify("tc","danger" , error); 
         

           }); 
          }else{ 
            this.notify("tc","danger" , "Invalid form"); 
          }
   
        event.preventDefault();

      }

    resetform(errors){ 
       this.setState({  
        adddescription : '',
        addplace : '', 
        adddate : '' 
       })  
    }

    
    addhandleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }   

    toggleModal(id) {  
       
       let meeting = this.state.internships.filter(internship => internship.id == id)[0].meeting ; 
       

       let errors = { 
            date : '' , 
            place : '' , 
            description : ''
       }
        this.setState({
            selectedinternship : id , 
            errors ,  
            adddescription : meeting.description , 
            adddate :   meeting.datetime , 
            addplace :   meeting.place   , 
        } , e => this.setState({ isModalOpen: !this.state.isModalOpen  }));   

      } 
      toggleModal2() { 
     
         this.setState({
             isModalOpen: !this.state.isModalOpen ,  
         });   

       }


     
    toggleModalS(id) {
        this.setState({ 
            selectedinternship : id ,        
          }, e => this.setState({  isStudentModalOpen : !this.state.isStudentModalOpen}));    
          console.log(id)
           }   
  
    toggleModalS2(){ 
        this.setState({ 
          isStudentModalOpen : !this.state.isStudentModalOpen
        }) 
  
      }     
    
    addhandleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name; 

        let errors = this.state.errors; 

        switch(name){  
          case 'adddescription' : 
             errors.description = value.length < 5 ? "Description should be >= 5" : ""
             break ;   
          case 'addplace' : 
             errors.place = value.length < 5 ? "Place should be >= 5" : ""
             break ;  
         
           
           default : 
             break ;   

        }

       this.setState({errors , [name]: value}, ()=> { 
          console.log(errors); 
        
       })  


      } 


     
    
    addvalidate(adddescription, addplace , adddate ) {

        const errors = {
            adddescription: '',
            addplace : '', 
            adddate : ''
        }; 

        if (this.state.touched.adddescription && adddescription.length < 4)
            errors.adddescription = 'Description should be >= 4 characters'; 
        if (this.state.touched.addplace &&  addplace.length < 3)
            errors.addplace = 'place should be >= 3 characters';   
        if ( this.state.adddate.length < 1)  
            errors.adddate = 'please select date and time'      
    

        return errors ; 
    } 

  render() { 
    const errors = this.addvalidate(this.state.adddescription, this.state.addplace , this.state.adddate); 

    let studentcomp ;

    if(this.state.selectedinternship == null){ 
           studentcomp = null ;  
           
    }else{  
     
     
      studentcomp =  <StudentModal isopen = {this.state.isStudentModalOpen} togglemodal = {this.toggleModalS2}  internship = { 

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
                  <CardTitle tag="h4">Meetings</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Id Internship</th>
                        <th>Meeting Description</th>
                        <th>Meeting Place</th>
                        <th>Meeting Date</th>  
                        <th>Student details</th>  
                        
                      </tr>
                    </thead>
                    <tbody> 
          {  
           this.state.internships 
           .filter(internship => internship.meeting !== null ) 
           .map((internship , index) =>  
             
             <tr>
              <td>{internship.id}</td>
              <td>{internship.meeting.description}</td>
              <td>{internship.meeting.place}</td>
              <td>{internship.meeting.datetime}</td>   
            
             
           {/*  <td> <Button1 name ="Meeting" onclick = {(e) => this.toggleModal(internship.id)}/></td> */}    
             <td>  <Button1 id={"student"+index} name ="Student" onclick = {(e) => this.toggleModalS(internship.id)}/></td>    
             <td> <Button id={"update"+index} color="info" onClick={(e) => this.toggleModal(internship.id)} >Update</Button></td>  
             <td> <Button id={"delete"+index} style={{ backgroundColor: "Red"  }} onClick={(e) => this.cancelMeetingModal(internship.id)}>Remove</Button></td>
           
             </tr>
            
            
            )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
         
          </Row>  
                 <Modal isOpen={this.state.isConfimationModalOpen} toggle={this.toggleCancelMeetingModal} >
                      <ModalHeader toggle={this.toggleCancelMeetingModal} >Cancel Meeting ?</ModalHeader>
                        <ModalBody>
                           Do you really want to cancel the meeting meeting !
                        </ModalBody>
                        <ModalFooter>
                        <Button id="justdoit" color="primary" onClick = {(e) => this. cancelMeeting(this.state.selectedinternship)} >Yes , just do it</Button>{' '}
                        <Button color="secondary" onClick = {this.toggleCancelMeetingModal}>No</Button>
                    </ModalFooter>
                    </Modal>
                     
                     {studentcomp} 
                     {this.UpdateMeetingModal(this.state.internships.filter(internship => internship.id == this.state.selectedinternship)[0])}
        </div>
      </>
    );
  }
}

export default Meetings ;