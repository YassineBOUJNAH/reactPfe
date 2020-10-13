import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import NotificationAlert from "react-notification-alert";
import { toast } from 'react-toastify';
import StudentHome from './StudentHome.js';
import InternshipOffers from './InternshipOffers.js'


const AddOfferForm = ({toggle}) => {

    const [form, setForm] = useState({ title: '', entreprise: '', description: '', studentUsername: '', startdate: '', lasttdate: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [internshipOffers, setInternshipOffers] = useState([]);
    const token = sessionStorage.getItem('jwt');
    const currentuser = JSON.parse(sessionStorage.getItem('currentuser')); //student 
    //const [modal, setModal] = useState(false);
    //const toggle = () => setModal(!modal);

    useEffect(() => {
        fetchInternshipOffers();
    }, []);

    const fetchInternshipOffers = async () => {
        console.log("feeetch !!");
        console.log(currentuser.id + " user id");
        const response = await fetch(
            "http://localhost:8081/internshipoffers/student/" + currentuser.id + "", {
            headers: { 'Authorization': token }
        }
        );
        const data = await response.json();
        setInternshipOffers(data);
        console.log("test" + data);
    };
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        //const errs = validate();
        //setForm({ title: 'devops', entreprise: 'ensias', description: 'stage', studentUsername: 'hamza' })
        //setIsSubmitting(true)
        await addOffer(form);
        window.location.reload(true);
        //setIsSubmitting(false);
        fetchInternshipOffers();
    };

    const addOffer = async () => {
        const token = sessionStorage.getItem('jwt');
        console.log("add offer to " + currentuser.id);
        console.log(currentuser.username + " username");
        console.log(form);
        const object = {
            title: form.title,
            entreprise: form.entreprise,
            description: form.description,
            studentUsername: currentuser.username,
            startdate: form.startdate,
            lasttdate: form.lasttdate
        }
        console.log("hey oject: "+JSON.stringify(object));
        
        await fetch('http://localhost:8081/internshipoffers?studentId=' + currentuser.id, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        }).then((response) => {
            if (response.status >= 200 && response.status <= 299) {
              console.log(response.status)
              fetchInternshipOffers();
            }})
            .catch((error) => {
                console.error(error);
    });}

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" placeholder="internship title" value={form.title} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="entreprise">Entreprise</Label>
                    <Input type="text" name="entreprise" id="entreprise" placeholder="Entreprise" value={form.entreprise} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" name="description" placeholder="Description" id="description" value={form.description} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="startdate">Date start</Label>
                    <Input type="date" name="startdate" id="startdate" value={form.startdate} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="lasttdate">Date end</Label>
                    <Input type="date" name="lasttdate" id="lasttdate" value={form.lasttdate} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="studentUsername">Student Username</Label>
                    <Input type="hidden" name="studentUsername" id="studentUsername" value={currentuser.username} onChange={handleChange} />
                </FormGroup>
                <Button color="primary">Submit</Button>
            </Form>
        </>
    );
}

export default AddOfferForm;