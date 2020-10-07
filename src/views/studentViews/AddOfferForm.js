import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { toast } from 'react-toastify';
import StudentHome from './StudentHome.js'

const AddOfferForm = () => {

    const [form, setForm] = useState({ title: '', entreprise: '', description: 'bbbb', studentUsername: 'aaaa' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [internshipOffers, setInternshipOffers] = useState([]);
    const token = sessionStorage.getItem('jwt');
    const currentuser = JSON.parse(sessionStorage.getItem('currentuser')); //student 

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
        //setIsSubmitting(false);


        fetchInternshipOffers();
    };

    const addOffer = async () => {
        const token = sessionStorage.getItem('jwt');
        console.log("add offer to " + currentuser.id);
        console.log(currentuser.username + " username");
        console.log(form);
        const object = {
            title: "test",
            entreprise: "IBM",
            description: "full stack developer Intership at IBM",
            studentUsername: "Yassine"
        }
        await fetch('http://localhost:8081/internshipoffers?studentId=' + currentuser.id, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(function (response) {
            console.log(response)
            return response.json();
        });
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" placeholder="internship title" value={form.title} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="entreprise">entreprise</Label>
                    <Input type="text" name="entreprise" id="entreprise" placeholder="entreprise" value={form.entreprise} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">description</Label>
                    <Input type="text" name="description" id="description" value={form.description} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="studentUsername">studentUsername</Label>
                    <Input type="hidden" name="studentUsername" id="studentUsername" value={currentuser.username} onChange={handleChange} />
                </FormGroup>

                <Button color="primary">Submit</Button>
            </Form>
        </>
    );
}

export default AddOfferForm;