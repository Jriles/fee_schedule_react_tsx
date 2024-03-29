import { Button, Container, Form } from "react-bootstrap";
import { CreateServiceSchema, DefaultApi } from '../api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, FormEvent } from "react";

type Callback = () => void;
interface CreateServiceFormProps {
    feeScheduleApi: DefaultApi,
    callback?: Callback
}

export default function CreateServiceForm(props:CreateServiceFormProps) {
    const [res, setRes] = React.useState("");
    const [serviceTitle, setServiceTitle] = React.useState("");

    function createService(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const serviceVals: CreateServiceSchema = {
            title: serviceTitle
        }

        props.feeScheduleApi.createService(serviceVals).then((response: AxiosResponse) => {
            console.log(response);
            setRes(response.statusText);
            // call callback if exists
            if (props.callback != undefined) props.callback()
        })
        .catch((error: any) => {
            setRes(error.response.data.errMsg)
            console.log(error);
        });
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setServiceTitle(e.currentTarget.value)
    }

    return (
        <Container className="mt-5 w-50">
            <Form onSubmit={createService}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control onChange={onTitleChange} placeholder="Ammendment Foreign" />
                </Form.Group>
                <Button type="submit">Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}