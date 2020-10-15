import React from 'react' 

import { Button, Modal, ModalHeader , ModalFooter , ModalBody, FormFeedback, Form, Input, FormGroup, Label, Row, Table, Col, Card, CardHeader, CardTitle, CardBody,  UncontrolledAlert, Alert  } from 'reactstrap';

function SupervisorModal(props) { 

  
    return ( 
      
        <Modal isOpen = {props.isopen} toggle={props.togglemodal}>   
                     <ModalHeader toggle={props.togglemodal}> Student details</ModalHeader> 
                          <ModalBody> 
                             
                           
                            <div className="modaldiv">  
                         
                            <div> <p>Firstname</p> <div className="value">{props.internship[0].supervisor["frstname"]} </div> </div>
                               <div> <p>Lastname</p> <div className="value"> {props.internship[0].supervisor["lastname"]} </div> </div>
                               <div> <p>Email</p> <div className="value"> {props.internship[0].supervisor["email"]} </div> </div>                                                       
                               <div> <p>CNE</p> <div className="value"> {props.internship[0].supervisor["cne"]} </div> </div> 

                            </div>     



                          </ModalBody> 
                         <ModalFooter> 
                             <Button variant="secondary" onClick={props.togglemodal}>Close</Button>
                         </ModalFooter>     
              </Modal>   
       
    )
}

export default SupervisorModal
