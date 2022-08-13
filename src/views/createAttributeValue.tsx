import { Button, Container, Form } from "react-bootstrap";
import { CreateAttributeValueSchema, DefaultApi } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";

interface CreateAttributeValueProps {
    feeScheduleApi: DefaultApi;
}

export default function CreateAttributeValue(props:CreateAttributeValueProps) {
    const [res, setRes] = React.useState("");
    const [attributeValueTitle, setAttributeValueTitle] = React.useState("");
    const [attributeTitle, setAttributeTitle] = React.useState("");
    type ServiceAttributeValuesParams = {
        attributeId: string;
    }
    let { attributeId } = useParams<ServiceAttributeValuesParams>();

    React.useEffect(() => {
        props.feeScheduleApi.getAttribute(attributeId ?? "").then((response: AxiosResponse) => {
            setAttributeTitle(response.data.title)
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    function createAttributeValue(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const attrVal: CreateAttributeValueSchema = {
            title: attributeValueTitle
        }

        props.feeScheduleApi.createAttributeValue(attributeId ?? "", attrVal).then((response: AxiosResponse) => {
            console.log(response);
            setRes(response.statusText);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAttributeValueTitle(e.currentTarget.value)
    }

    return (
        <Container className="mt-5 w-50">
            <Form onSubmit={createAttributeValue}>
                <Form.Group className="mb-3">
                    <Form.Label>{attributeTitle}</Form.Label>
                    <Form.Control onChange={onTitleChange} placeholder="Alabama" />
                </Form.Group>
                <Button type="submit">Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}