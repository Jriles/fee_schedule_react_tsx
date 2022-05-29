import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";
import { CreateAttributeSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent } from "react";

export default function CreateAttribute() {
    const [res, setRes] = React.useState("");
    const [attributeTitle, setattributeTitle] = React.useState("");

    function createAttribute() {
        const attr: CreateAttributeSchema = {
            title: attributeTitle
        }

        feeScheduleApi.createAttribute(attr).then((response: AxiosResponse) => {
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
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Attribute Name</Form.Label>
                    <Form.Control onChange={onTitleChange} placeholder="Jurisdiction" />
                </Form.Group>
                <Button onClick={createAttribute}>Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}