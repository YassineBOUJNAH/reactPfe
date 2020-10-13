import React, { Component } from 'react'
import { Form, FormGroup, Input, Label ,  Modal , ModalBody , ModalFooter , ModalHeader ,  Button ,   FormFeedback, Alert ,Card , CardBody , CardText , CardLink , CardSubtitle , CardTitle } from 'reactstrap'   
import './post.css' 


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import NotificationAlert from "react-notification-alert" ;     
import  Select  from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export default class post extends Component { 

     constructor(props) {
         super(props)

         this.state = {  
               posts : [] ,  
               internships : [] ,  
               selectedstudents : [] , 
               isDialogOpen : false , 
               isConfimationModalOpen : false ,   
               selectedFile : null ,  
               isPrivateOpen : false , 
               selectedpost : null , 
               description : '' , 
               content :'' ,  
               visibility :null , 
               disabled : true , 
               errors : {  
                   description : null , 
                   content : null
               }
         }  
         
         this.reseterrors = this.reseterrors.bind(this) ;
         this.toggleDialog = this.toggleDialog.bind(this);  
         this.toggleModal = this.toggleModal.bind(this); 
         this.toggleCancelModal = this.toggleCancelModal.bind(this); 
         this.removePost = this.removePost.bind(this);
         this.addhandleInputChange = this.addhandleInputChange.bind(this);    
         this.onFileChangeHandler = this.onFileChangeHandler.bind(this); 
         this.handleOpenPrivateModal = this.handleOpenPrivateModal.bind(this);
         this.handleClosePrivateModal = this.handleClosePrivateModal.bind(this); 
         this.selectStudent = this.selectStudent.bind(this);
         this.submit = this.submit.bind(this);

     }   

     componentDidMount() { 
       
       this.gotposts(); 
       this.gotstudent();
      
  }  
  
  //I got the internships , so I can access the student .

  gotstudent(){  


    const token  = sessionStorage.getItem('jwt');  
    const currentuser =  JSON.parse(sessionStorage.getItem('currentuser')); 
      
  fetch("http://localhost:8081/supervisor/"+currentuser.id+"/internships", {
    headers: { 'Authorization': token }
  })
    .then(res => res.json())
    .then(
      (data) => { 
         
        this.setState({ 
           internships  : data
        });
      },
      (error) => {
           
      }
    ) 
  }
  
  //handleOpen for private post modal

  handleOpenPrivateModal(){ 
    this.setState({ isPrivateOpen : true})
  }  

  //handleClose for private post modal

  handleClosePrivateModal(){  
    this.setState({ isPrivateOpen : false})
  }
 

 removePost(id){   
  const token  = sessionStorage.getItem('jwt');  
  console.log("id :"+id)

  fetch("http://localhost:8081/posts/"+id , { 
 
      headers : { 'Authorization' : token } , 
      method : 'DELETE'
  }) 
  .then((response) => { 
    if (response.status >= 200 && response.status <= 299) {  
      this.resetdata();  
      this.setState({ isConfimationModalOpen : false })
      this.notify("tc","success", "Post removed !"); 
      this.gotposts();
      
    } else {  
     
      throw "Something went wrong , error status : " + response.status ;  
    }
  })
   .catch((error) => {  
      
       this.notify("tc","danger" , error);  
       
       

   }); 


  } 

  gotposts(){ 
    const token  = sessionStorage.getItem('jwt');  
    const currentuser =  JSON.parse(sessionStorage.getItem('currentuser')); 
      
  fetch("http://localhost:8081/supervisors/"+currentuser.id+"/posts", {
    headers: { 'Authorization': token }
  })
    .then(res => res.json())
    .then(
      (data) => { 
        console.log(data); 
        this.setState({
          posts : data 
        });
      },
      (error) => {
           
      }
    ) 
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
  saveByteArray(reportName, byte , type) {
  var blob = new Blob([byte], {type: type});
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
}; 

showButtonIfFileExist(post){
    if(post.file){
      return (  <Button onClick = {(e) => this.saveByteArray(post.file.name,this.base64ToArrayBuffer(post.file.data),post.file.type) }>{post.file.name} </Button>)
    }else{ 
      return (<p></p>)
    }
}  

    displaySelectedStudents(){  
       
      if(this.state.selectedstudents.length == 0){  

        return(<p>No student is selected</p>) ;

        }else{ 

 
            return ( this.state.selectedstudents.map((student)=>      
                <Card className="card_student">   
                     <CardBody>     
                      <CardTitle className="cardtitle">{student.frstname} {student.lastname}</CardTitle> 
  
                 <div className="student_action"> 
                  <Button color="info">Remove</Button> 
  
                   </div>      
                   </CardBody>
            </Card>      


            ))}   
    }


    //add a student to the selected students 

    selectStudent(student){  
       
      this.setState(state => {
        const selectedstudents = [...state.selectedstudents, student];
        return {
             selectedstudents
          
        };

    } )
  }

    displayMystudents(){   
       if(this.state.internships.length == 0){  

            return(<h1>you have no post</h1>) ;

        }else{ 
 
     
 return ( this.state.internships.map((internship)=>      
 <Card className="card_student">   
 <CardBody>     
      <CardTitle className="cardtitle">{internship.student.frstname} {internship.student.lastname}</CardTitle> 

        <div className="student_action"> 
            <Button color="info" onClick={(e) => this.selectStudent(internship.student) }>Select</Button> 
          
        </div>      
 </CardBody>
</Card>      
 
 
 
 
 ) ) ;

   

  
}   


}
 
  displaymyposts(){  
    if(this.state.posts.length == 0){  

      return(<div className="content row">
      <div className="col-8 ml-auto mr-auto">
        <div className="content text-center">
          <img
            alt="..."
            src={require("assets/img/email.png")}
          />
          <h4 className="text-center">You have no post!</h4>
        </div>
      </div>
    </div>) ;

    }else{
 
   return ( this.state.posts.map((post)=>      
   <Card className="card_post">   
   <CardBody>     
        <CardTitle className="cardtitle">{post.description}</CardTitle> 
        <CardSubtitle className="cardsub">Posted at : {post.postedAt}</CardSubtitle> 
         <CardText className = "cardtext">{post.content}</CardText>           
          {this.showButtonIfFileExist(post)}
          <div className="post_actions"> 
              <Button color="info">Update</Button> 
              <Button style={{ backgroundColor: "Red"  }} onClick={(e) => this.toggleModal(post.id)} >Remove</Button> 
          </div>      
   </CardBody>
 </Card>      
   
   
   
   
   ) ) ;

     
 
    
  }    
}


   //Notifications : 

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


  toggleModal(id){    
    this.setState({ selectedpost : id} , (e) => this.setState({ isConfimationModalOpen : true }))

  } 

  PushFile(){  

    const token = sessionStorage.getItem('jwt')    
    const formData = new FormData(); 
    formData.append('file', this.state.selectedFile);
    fetch('http://localhost:8081/upload', { 
        headers: { 'Authorization': token } ,
        method: 'post',
        body: formData
    }).then(res => {
        if(res.ok) {
            console.log(res.data);
            alert("File uploaded successfully.")
        }
    });
  }


     toggleDialog() {  

            this.setState({isDialogOpen :!this.state.isDialogOpen }, ()=>{this.reseterrors()})
            this.resetdata() 
            
     }   
     toggleCancelModal(){ 
       this.setState({  
         isConfimationModalOpen : !this.state.isConfimationModalOpen 
        }) 
        this.resetdata();
     } 
     resetdata(){ 
       this.setState({  
        selectedFile : null , 
        selectedpost : null

       })
     }

     reseterrors(){  
       let errors = { 
           description : '' , 
           content : ''
       }
         this.setState({ errors  })
     } 
 


     onFileChangeHandler = (e) => {
      e.preventDefault();
      this.setState({
          selectedFile: e.target.files[0]
      } , () => { 
          console.log(this.state.selectedFile);
      }); 

    }


     addhandleInputChange(event){   

        const target = event.target ;
        const value = target.value  ;
        const name = target.name    ; 

        let errors = this.state.errors ;  
        let val = false ; 
        

        switch(name){  
          case 'description' : 
             errors.description = value.length < 5 ? "Description should be >= 5" : null
             break ;   
          case 'content' : 
             errors.content = value.length < 5 ? "Content should be >= 5" : null
             break ;   
          case 'visibility' : 
             val = value == 2 ? true : false ;  
             break
         
           default : 
             break ;   

        } 

        this.setState({ isPrivateOpen : val})

       this.setState({errors , [name]: value}, ()=> { 
          if(this.state.errors.description !== null || this.state.errors.content !== null ){
            this.setState({ disabled : true })   
            console.log("description : "+this.state.errors.description + "content :"+this.state.errors.content)
           
         
          }else{ 
            this.setState({ disabled : false })   
            console.log("description : "+this.state.errors.description + "content :"+this.state.errors.content)
            
            
          }  
          

       })  

     }

     submit(){    
        this.toggleDialog(); 
        const currentuser =  JSON.parse(sessionStorage.getItem('currentuser')); 
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); 
        var dateTime = date+' '+time; 
        const data = new FormData(); 
        data.append('file', this.state.selectedFile);  
        data.append('postedAt' , dateTime ) 
        data.append('description' , this.state.description) 
        data.append('content',this.state.content);
        data.append('idsup',currentuser.id)            
         const token  = sessionStorage.getItem('jwt');    
        // const jsondata = JSON.stringify(data) ; 
        
         fetch("http://localhost:8081/posts" ,{ 
             method : 'POST' ,  
             headers: { 'Authorization': token    
             } ,  
             body : data
         }) 
         .then((response) => { 
            if (response.status >= 200 && response.status <= 299) { 
              this.notify("tc","success", "Post published");  
              console.log(response.status)
              this.gotposts(); 
              this.resetdata();
            //  return response.json();
            } else {  
             
              throw "Something went wrong , error status : " + response.status ;  
            }
          })
           
           .catch((error) => {  
              
           this.notify("tc","danger" , error); 

           }); 
          

     }

    render() {
        return (
            <div className="content">    
                  <NotificationAlert ref={this.notificationAlert} />
               <h4 className="note"> Share files , contents , ... whaterver you want with your students !  </h4>
               <div className = "NewPost">
                   <Form className="form_addpost"> 
                       <FormGroup> 
                         <Input   
                                 id="share"
                                 type="text"  
                                 className="description"  
                                 placeholder="Click here if you want to post something !"  
                                 value="" 
                                 onClick={this.toggleDialog}
                         
                         />  
                       </FormGroup>       
                   </Form>   

                   <div> 
                   <Dialog open={this.state.isDialogOpen} onClose={this.toggleDialog} aria-labelledby="form-dialog-title">
                       <DialogTitle id="form-dialog-title">Publish a POST</DialogTitle>
                       <DialogContent>
            
                           <Form> 
                               <FormGroup> 
                                   <Input    
                                       name = "description" 
                                       id   = "description"
                                       type = "text"  
                                       placeholder = "Description"  
                                       invalid = {this.state.errors.description && !this.state.description}
                                       onChange={this.addhandleInputChange}
                                    
                                    />  
                                     
                                     <FormFeedback>{this.state.errors.description}</FormFeedback>
                               </FormGroup> 
                               <FormGroup> 
                               <Input    
                                       name = "content" 
                                       id   = "content"
                                       type = "textarea"  
                                       placeholder = "Content"  
                                       style = {{ width : "500px"}}  
                                       onChange={this.addhandleInputChange}  
                                       invalid = {this.state.errors.content} 

                                    /> 
                                     <FormFeedback>{this.state.errors.content}</FormFeedback>
                               </FormGroup> 
                               <FormGroup> 
                                 <Input  
                                    name =   "file" 
                                    id   =   "uploadfile" 
                                    type =   "file" 
                                    onChange={this.onFileChangeHandler} 
                                 />  
                                 
                               </FormGroup> 
                               <FormGroup>    

                               <FormControl>
                         {/*        <InputLabel id="demo-controlled-open-select-label">Visibility</InputLabel>
                              <Select
                                     labelId="demo-controlled-open-select-label"
                                     id="demo-controlled-open-select"  
                                     name = "visibility"
                                     className="visibility"  
                                     onChange = {this.addhandleInputChange}
                                >
                              
                                 <MenuItem value={1}>Public</MenuItem>
                                 <MenuItem value={2}>Private</MenuItem> 

                       </Select>  */}
                               </FormControl>
                              
                                 
                              
                                 
                               </FormGroup>  
                             
                           </Form>

                         </DialogContent>
                         <DialogActions>
                           <Button onClick={this.toggleDialog} color="primary">
                                     Cancel
                             </Button>
                             <Button id="publish" onClick={this.submit} disabled={this.state.disabled} color="primary">
                                     Publish
                            </Button>
                         </DialogActions>
              </Dialog>
                   </div>
                   
               </div>  
             <div className="posts"> 
                 {this.displaymyposts()}  
             </div> 

             <Modal isOpen={this.state.isConfimationModalOpen} toggle={this.toggleCancelModal} >
                 <ModalHeader toggle={this.toggleCancelModal} >Remove this post ?</ModalHeader>
                          <ModalBody>
                              Do you really want to remove this post !
                          </ModalBody>
                  <ModalFooter>
                        <Button color="primary" onClick = {(e) => this.removePost(this.state.selectedpost)} >Yes , just do it</Button>{' '}
                        <Button color="secondary" onClick = {this.toggleCancelModal}>No</Button>
                  </ModalFooter>
             </Modal> 

             {/*Private post modal*/} 

             <Dialog open={this.state.isPrivateOpen} onClose={this.handleClosePrivateModal} aria-labelledby="form-dialog-title">
                       <DialogTitle id="form-dialog-title">SELECT STUDENTS</DialogTitle>
                       <DialogContent>  
                         <div className="student_list"> 
                             {this.displayMystudents()}  
                            
                         </div>  
                         <p className="selected">Selected students</p>
                         <div className="selected_students"> 

                             {this.displaySelectedStudents()}  
                             
                         

                         </div>
                           
                           
                       </DialogContent>  
                         <DialogActions>
                           <Button color="primary" onClick={this.handleClosePrivateModal}>
                                     Cancel
                             </Button>
                             <Button  color="primary">
                                     Confirm
                            </Button>
                         </DialogActions>
              </Dialog>
              
           
             
            </div>
        )
    }
}
