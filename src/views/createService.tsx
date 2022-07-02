import { Button, Container, Form } from "react-bootstrap";
import { CreateServiceSchema, DefaultApi } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent } from "react";

interface CreateServiceProps {
    feeScheduleApi: DefaultApi;
}

export default function CreateService(props:CreateServiceProps) {
    const [res, setRes] = React.useState("");
    const [serviceTitle, setServiceTitle] = React.useState("");

    function createService() {
        const serviceVals: CreateServiceSchema = {
            title: serviceTitle
        }

        props.feeScheduleApi.createService(serviceVals).then((response: AxiosResponse) => {
            console.log(response);
            setRes(response.statusText);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setServiceTitle(e.currentTarget.value)
    }

    return (
        <Container className="mt-5 w-50">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control onChange={onTitleChange} placeholder="Ammendment Foreign" />
                </Form.Group>
                <Button onClick={createService}>Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}