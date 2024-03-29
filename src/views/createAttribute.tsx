import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { CreateAttributeSchema, DefaultApi } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, FormEvent } from "react";

interface CreateAttributeProps {
    feeScheduleApi: DefaultApi;
}

export default function CreateAttribute(props:CreateAttributeProps) {
    const [res, setRes] = React.useState("");
    const [attributeTitle, setattributeTitle] = React.useState("");

    function createAttribute(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const attr: CreateAttributeSchema = {
            title: attributeTitle
        }

        props.feeScheduleApi.createAttribute(attr).then((response: AxiosResponse) => {
            console.log(response);
            setRes(response.statusText);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setattributeTitle(e.currentTarget.value)
    }

    return (
        <Container className="mt-5 w-50">
            <Form onSubmit={createAttribute}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Attribute Name</Form.Label>
                    <Form.Control onChange={onTitleChange} placeholder="Jurisdiction" />
                </Form.Group>
                <Button type="submit">Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}