import React, { Component } from 'react'
import { Form, FormGroup, Row, CardHeader, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Button, FormFeedback, Alert, Card, CardBody, CardText, CardLink, CardSubtitle, CardTitle } from 'reactstrap'
import './post.css'


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

import NotificationAlert from "react-notification-alert";

import { Link } from "react-router-dom";

export default class report extends Component {

  constructor(props) {
    super(props)

    this.state = {
      internship: '',
      reports: [],
      isDialogOpen: false,
      isConfimationModalOpen: false,
      selectedFile: null,
      selectedreport: null,
      description: '',
      content: '',
      disabled: true,
      errors: {
        description: null,
        content: null
      }
    }

    this.reseterrors = this.reseterrors.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleCancelModal = this.toggleCancelModal.bind(this);
    this.removereport = this.removereport.bind(this);
    this.addhandleInputChange = this.addhandleInputChange.bind(this);
    this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
    this.submit = this.submit.bind(this);
    this.fechInternship = this.fechInternship.bind(this);
    this.gotreports = this.gotreports.bind(this);

  }

  componentDidMount() {
    this.fechInternship();
    this.gotreports();


  }

  fechInternship() {
    const token = sessionStorage.getItem('jwt');
    const currentuser = JSON.parse(sessionStorage.getItem('currentuser'));

    fetch("http://localhost:8081/internships/student/" + currentuser.id, {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then(
        (data) => {
          console.log("internship dta: " + data + " id: " + currentuser.id);
          console.log(data[0].id);
          this.setState({
            internship: data[0].id
          });
          this.gotreports();
        }).catch((error) => {
          console.log(error);
        });
  };


  removereport(id) {
    const token = sessionStorage.getItem('jwt');
    console.log("id :" + id)

    fetch("http://localhost:8081/reports/" + id, {

      headers: { 'Authorization': token },
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          this.resetdata();
          this.setState({ isConfimationModalOpen: false })
          this.notify("tc", "success", "report removed !");
          this.gotreports();

        } else {

          throw "Something went wrong , error status : " + response.status;
        }
      })
      .catch((error) => {

        this.notify("tc", "danger", error);



      });


  }
  gotreports() {
    const token = sessionStorage.getItem('jwt');
    const currentuser = JSON.parse(sessionStorage.getItem('currentuser'));
    const internshipID = this.state.internship;

    fetch("http://localhost:8081/internships/student/" + currentuser.id, {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then(
        (data) => {
          console.log("repoooooooorts");
          console.log(data);
          this.setState({
            reports: data
          });
        },
        (error) => {
          console.log("error in fetching reports");
          console.error(error);
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
  saveByteArray(reportName, byte, type) {
    var blob = new Blob([byte], { type: type });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  };

  showButtonIfFileExist(report) {
    if (report.reportfile) {
      return (<Button color="primary" onClick={(e) => this.saveByteArray(report.reportfile.description, this.base64ToArrayBuffer(report.reportfile.data), report.reportfile.type)}>Download attached file</Button>)
    } else {
      return (<p>No file found</p>)
    }
  }

  displaymyreports() {
    console.log("check report ");
    if (this.state.reports.length == 0) {
      return (<h3>No report found</h3>);
    } else {
      return (
        this.state.reports
          .filter(report => report.reportfile !== null)
          .map((report) =>
            <Card style={{ backgroundColor: '#f2ecba', borderColor: '#333', width: '100%' }} key={report.reportfile.id} className="card_post">
              <CardBody>
                <CardTitle className="cardtitle">{report.reportfile.description}</CardTitle>
                <CardSubtitle className="cardsub">Report version : {report.reportfile.id}</CardSubtitle>
                {this.showButtonIfFileExist(report)}
              </CardBody>
            </Card>

          )
      );
    }
  }

  //Notifications : 

  notificationAlert = React.createRef();

  notify(place, type, message) {

    var type = type;

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


  toggleModal(id) {
    this.setState({ selectedreport: id }, (e) => this.setState({ isConfimationModalOpen: true }))

  }

  PushFile() {
    const token = sessionStorage.getItem('jwt')
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    fetch('http://localhost:8081/upload', {
      headers: { 'Authorization': token },
      method: 'report',
      body: formData
    }).then(res => {
      if (res.ok) {
        console.log(res.data);
        alert("File uploaded successfully.")
      }
    });
  }


  toggleDialog() {

    this.setState({ isDialogOpen: !this.state.isDialogOpen }, () => { this.reseterrors() })
    this.resetdata()

  }
  toggleCancelModal() {
    this.setState({
      isConfimationModalOpen: !this.state.isConfimationModalOpen
    })
    this.resetdata();
  }
  resetdata() {
    this.setState({
      selectedFile: null,
      selectedreport: null

    })
  }

  reseterrors() {
    let errors = {
      description: '',
      content: ''
    }
    this.setState({ errors })
  }



  onFileChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0]
    }, () => {
      console.log(this.state.selectedFile);
    });

  }


  addhandleInputChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    let errors = this.state.errors;

    switch (name) {
      case 'description':
        errors.description = value.length < 5 ? "Description should be >= 5" : null
        break;
      case 'content':
        errors.content = value.length < 5 ? "Content should be >= 5" : null
        break;

      default:
        break;

    }

    this.setState({ errors, [name]: value }, () => {
      if (this.state.errors.description !== null || this.state.errors.content !== null) {
        this.setState({ disabled: true })
        console.log("form not valid")
      } else {
        this.setState({ disabled: false })
        console.log("form valid")
      }

    })

  }

  submit() {
    this.toggleDialog();
    const currentuser = JSON.parse(sessionStorage.getItem('currentuser'));
    //var today = new Date();
    //var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); 
    //var dateTime = date+' '+time;
    const internID = this.state.internship;
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    //data.append('reportedAt' , dateTime ) 
    data.append('description', this.state.description)
    //data.append('content', this.state.content);
    data.append('idsup', this.state.internship); //internship id to fetch the reports
    const token = sessionStorage.getItem('jwt');
    // const jsondata = JSON.stringify(data) ; 

    fetch("http://localhost:8081/internships/" + internID + "/setreport", {
      method: 'POST',
      headers: {
        'Authorization': token
      },
      body: data
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          this.notify("tc", "success", "report published");
          console.log(response.status)
          this.gotreports();
          //this.resetdata();
          //  return response.json();
        } else {

          throw "Something went wrong , error status : " + response.status;
        }
      })

      .catch((error) => {

        this.notify("tc", "danger", error);

      });


  }

  render() {
    if (this.state.internship == 0) {
      return (
        <div className="content row">
          <div className="col-8 ml-auto mr-auto">
            <div className="content text-center">
              <img
                alt="..."
                src={require("assets/img/cancel.png")}
              />
              <h4 className="text-center">Looks like you have any internship accepted!</h4>
              <h6 className="text-center">You can create an internship offer, it's very easy</h6>
              <Button color="primary" tag={Link} to="/home">Create internship offer</Button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="content row">
          <NotificationAlert ref={this.notificationAlert} />
          <Card className="col-8 ml-auto mr-auto">
            <CardHeader>
              <CardTitle tag="h4">Add report</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="Newreport mb-5">
                <Form className="form_addreport">
                  <FormGroup>
                    <Input
                      style={{ width: '100%' }}
                      type="text"
                      className="description"
                      placeholder="Click here if you want to add a report!"
                      value=""
                      onClick={this.toggleDialog}
                    />
                  </FormGroup>
                </Form>

                <div>
                  <Dialog open={this.state.isDialogOpen} onClose={this.toggleDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Publish a report</DialogTitle>
                    <DialogContent>

                      <Form>
                        <FormGroup>
                          <Input
                            name="description"
                            id="description"
                            type="text"
                            placeholder="Title"
                            invalid={this.state.errors.description && !this.description}
                            onChange={this.addhandleInputChange}

                          />

                          <FormFeedback>{this.state.errors.description}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <Input
                            name="content"
                            id="content"
                            type="textarea"
                            placeholder="Description"
                            style={{ width: "500px" }}
                            onChange={this.addhandleInputChange}
                            invalid={this.state.errors.content}

                          />
                          <FormFeedback>{this.state.errors.content}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <Input
                            name="file"
                            id="file"
                            type="file"
                            onChange={this.onFileChangeHandler}
                          />

                        </FormGroup>
                      </Form>

                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.toggleDialog} color="primary">
                        Cancel
                             </Button>
                      <Button onClick={this.submit} disabled={this.state.disabled} color="primary">
                        Publish
                            </Button>
                    </DialogActions>
                  </Dialog>
                </div>

              </div>
              <div className="reports">
                {this.displaymyreports()}
              </div>
            </CardBody>
          </Card>
          <Modal isOpen={this.state.isConfimationModalOpen} toggle={this.toggleCancelModal} >
            <ModalHeader toggle={this.toggleCancelModal} >Remove this report ?</ModalHeader>
            <ModalBody>
              Do you really want to remove this report !
                          </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={(e) => this.removereport(this.state.selectedreport)} >Yes , just do it</Button>{' '}
              <Button color="secondary" onClick={this.toggleCancelModal}>No</Button>
            </ModalFooter>
          </Modal>



        </div>
      )
    }
  }
}
