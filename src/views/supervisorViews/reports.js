import React, { Component } from 'react'  
import { Form, FormGroup, Input, Label ,  Modal , ModalBody , ModalFooter , ModalHeader ,  Button ,   FormFeedback, Alert ,Card , CardBody , CardText , CardLink , CardSubtitle , CardTitle } from 'reactstrap'
import './reports.css' 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide'; 
import Viewer from '@phuocng/react-pdf-viewer'; 
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css'; 
import { Worker } from '@phuocng/react-pdf-viewer'; 
import SearchBar from "material-ui-search-bar";  
import NotificationAlert from "react-notification-alert" ;  


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default class post extends Component { 

    constructor(props) {
        super(props)

        this.state = {    
            internships : [] ,   
            selectedReport : [] , 
            reportDesc : '' , 
            value : '' , 
            filtered : [] ,  
            subject : '' , 
            content : '' ,  
            destination : '' , 
            errors : {  
                subject : '' , 
                content : ''
            }
            , 
            disabled : true , 
            isModalOpen : false ,  
            isModalFileOpen : false , 
            isModalFOpen : false

        }  

        this.addhandleInputChange = this.addhandleInputChange.bind(this);
        this.handleModal = this.handleModal.bind(this); 
        this.getPdfFile = this.getPdfFile.bind(this);
        this.setReport = this.setReport.bind(this); 
        this.handleFileModal = this.handleFileModal.bind(this); 
        this.handleChange = this.handleChange.bind(this);  
        this.handleFModal = this.handleFModal.bind(this);
        this.filter = this.filter.bind(this); 
        this.onSubmit = this.onSubmit.bind(this);
    
    }         
  //notifications
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

    onSubmit(){  

        let destination = this.state.destination ; 

        const token = sessionStorage.getItem('jwt')     
        const sup = JSON.parse(sessionStorage.getItem('currentuser'));
        const formData = new FormData(); 
        formData.append('subject', this.state.subject); 
        formData.append('content',this.state.content); 
        formData.append('destination',this.state.destination)  
        
       
        

        fetch("http://localhost:8081/sendemail" ,{ 
            method : 'POST' ,  
            headers: { 'Authorization': token    
            } ,  
            body : formData
        }) 
        .then((response) => { 
           if (response.status >= 200 && response.status <= 299) {  
             
             this.notify("tc","success", "Email sent successfully");    
             this.setState({ isModalFOpen : false });
                        
           } else {  
            
             throw "Something went wrong , error status : " + response.status ;  
           }
         })
          
          .catch((error) => {  
           
            this.notify("tc","danger",error);  
            this.setState({ isModalFOpen : false });

          }); 

    }

    addhandleInputChange(event){   

        const target = event.target ;
        const value = target.value  ;
        const name = target.name    ; 

        let errors = this.state.errors ;  


        switch(name){  
          case 'subject' : 
             errors.subject = value.length < 5 ? "Subject should be >= 5" : null
             break ;   
          case 'content' : 
             errors.content = value.length < 5 ? "Content should be >= 5" : null
             break ;   
       
          default : 
             break ;   

        } 

      
       this.setState({errors , [name]: value}, () => { 
          if(this.state.errors.subject !== null || this.state.errors.content !== null ){
            this.setState({ disabled : true });   
              console.log("subject : "+this.state.errors.subject + "content :"+this.state.errors.content)
           
          }else{ 
            this.setState({ disabled : false });   
              console.log("subject : "+this.state.errors.subject + "content :"+this.state.errors.content) 
        
          }  
          

       })  

     }
     
    handleFileModal(){  

        this.setState({ isModalFileOpen : !this.state.isModalFileOpen }); 

    }  

    handleFModal(){ 
        this.setState({  isModalFOpen : !this.state.isModalFOpen }); 
    }

    handleChange(event){ 
           this.setState({ value :   event.target.value });      
    } 

    filter(value){  
         let data = this.state.internships ;  

         this.setState({ filtered : data.filter(u => u.student.lastname.includes(value)) } , () => console.log(this.state.filtered) )

    }
    
    handleModal(){  

        this.setState({ isModalOpen : !this.state.isModalOpen });
    }

    componentDidMount(){ 
        this.gotInternships();
    }   

    base64ToArrayBuffer(base64) { 

        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
           var ascii = binaryString.charCodeAt(i);
           bytes[i] = ascii;
        }
        return bytes;
     } 


    setReport(report){ 
        this.setState({ selectedReport : report })
    } 

    displaySelectedReport(){  
        if(this.state.selectedReport.length == 0){  

            return(<p>Nothing</p>) ;
    
            }else{  
                console.log(this.state.selectedReport);
    
     
                return (  
                    
                     <>   
                 
                    <Viewer  
                       fileUrl={this.base64ToArrayBuffer(this.state.selectedReport)}
                    />   
            

                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js"> 

                </Worker>

                   </>
    
                )}   

    }

    getPdfFile(){ 
    const token  = sessionStorage.getItem('jwt');  
    const currentuser =  JSON.parse(sessionStorage.getItem('currentuser')); 
      
  fetch("192.168.1.20:8081/internships/sup/1/report", {
    headers: { 'Authorization': token }
  })
    .then(res => res.json())
    .then(
      (data) => { 
         
       
      },
      (error) => {
           
      }
    ) 
    }
    
    gotInternships(){ 
    const token  = sessionStorage.getItem('jwt');  
    const currentuser =  JSON.parse(sessionStorage.getItem('currentuser')); 
      
  fetch("http://localhost:8081/supervisor/"+currentuser.id+"/internships", {
    headers: { 'Authorization': token }
  })
    .then(res => res.json())
    .then(
      (data) => { 
         
        this.setState({ 
           internships  : data , 
           filtered : data
        });
      },
      (error) => {
           
      }
    ) 
    } 


    displayInternships(){ 
        if(this.state.internships.length == 0){  

            return(<p>There is no internships</p>) ;
    
            }else{ 
    
     
                return ( this.state.filtered.map((internship)=>      
                    <Card className="report_card">   
                         <CardBody>    
                         <div className ="flex-container">   
                         <img
                           alt="..."
                           src={require("assets/img/student.png")} 
                           className = "student_img"
                         />
                          <p className="cardtit">{internship.student.frstname} {internship.student.lastname}</p>  
                        
                          </div>  
                          <Button color="info" className="send_feedback" onClick={ () => this.setState({destination : internship.student.email }, () => this.handleFModal() )}>Send feedback <i class="fas fa-paper-plane"></i></Button>
                        
      
                          <div className="student_action"> 
                          <Button color="info"  disabled={ internship.reportfile ? false : true } onClick={() => this.setState({ selectedReport : internship.reportfile.data  }, () => this.setState({ isModalFileOpen : !this.state.isModalFileOpen  }))}> display student report</Button>  
                          <Button color="info" disabled = { internship.reportfile ? false : true} onClick = {() => this.setState({ reportDesc : internship.reportfile.description } , () => this.setState({isModalOpen : !this.state.isModalOpen}))}>Report description</Button> 
      
                       </div>      
                       </CardBody>
                </Card>      
    
    
                ))}   
    }
 




    render() {
        return (  

            <>
               <div className="content">  
                   <NotificationAlert ref={this.notificationAlert} />
                     <p className="studentrep"> Student  Reports  </p>    
                     <div className="search_bar">
                        <SearchBar     
                          onChange={(newvalue) => this.filter(newvalue) }                  
                        />  
                    
                     </div> 

                
                     <div className="internships_reports">  
                         {this.displayInternships()}
                     </div>
               </div> 

                 {/*description modal */ }   
                  <Dialog
                      open={this.state.isModalOpen}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={this.handleModal}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Report Description"}</DialogTitle>
                          <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            {this.state.reportDesc}
                          </DialogContentText>
                         </DialogContent>
                         <DialogActions>
                       <Button onClick={this.handleModal} color="primary">
                               Cancel
                       </Button>
                      
                    </DialogActions>
                   </Dialog>    

                {/* Report File */ }  

                   <Dialog
                      open={this.state.isModalFileOpen}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={this.handleFileModal}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Student Report"}</DialogTitle>
                          <DialogContent>
                                      {this.displaySelectedReport()}
                         </DialogContent>
                         <DialogActions>
                       <Button onClick={this.handleFileModal} color="primary">
                               Cancel
                       </Button>
                      
                    </DialogActions>
                   </Dialog>    

                   {/* send feedback */} 

                   <Dialog
                      open={this.state.isModalFOpen}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={this.handleFModal}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Send FeedBack"}</DialogTitle>
                          <DialogContent> 
                               <Form> 
                                  <FormGroup> 
                                      <Input  
                                         type="text"   
                                         name="subject" 
                                         id="subject"
                                         placeholder="Subject"  
                                         className="desc"   
                                         onChange={this.addhandleInputChange}  
                                         invalid = {this.state.errors.subject } 
                                      />    
                                       <FormFeedback>{this.state.errors.subject}</FormFeedback>                                    
                                  </FormGroup> 
                                  <FormGroup>
                                     <Input  
                                          type="textarea"   
                                          name="content" 
                                          id="content"
                                          placeholder="Content"  
                                          className="mess"   
                                          onChange={this.addhandleInputChange}  
                                          invalid = {this.state.errors.content} 

                                    /> 
                                     <FormFeedback>{this.state.errors.content}</FormFeedback>
                                  </FormGroup>  
                                

                               </Form>  
                             
                                     
                         </DialogContent>
                         <DialogActions> 
                         <div className="actions">
                                  <Button onClick={this.handleFModal} color="primary" className="btnn">
                                       Cancel
                                  </Button>  
                                  <Button onClick={this.onSubmit} disabled={this.state.disabled} color="primary" className="btnn">
                                       Send
                                  </Button> 
                              </div>   
                      
                        </DialogActions>
                   </Dialog>    

                  

                  
                </>
        )}
}