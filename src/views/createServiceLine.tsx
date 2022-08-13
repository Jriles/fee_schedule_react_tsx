import { Button, Container, Form } from "react-bootstrap";
import { AttributeResponse, CreateAttributeSchema, CreateAttributeValueSchema, DefaultApi } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";

interface CreateServiceAttributeLineProps {
    feeScheduleApi: DefaultApi;
}

export default function CreateServiceAttributeLine(props:CreateServiceAttributeLineProps) {
    const [res, setRes] = React.useState("");
    const [attributes, setAttributes] = React.useState<AttributeResponse[]>([]);
    const [serviceTitle, setServiceTitle] = React.useState("");
    const [selectedAttribute, setSelectedAttribute] = React.useState("")
    type ServiceAttributeLineParams = {
        serviceId: string;
    }
    let { serviceId } = useParams<ServiceAttributeLineParams>();

    React.useEffect(() => {
        props.feeScheduleApi.getAllAttributes().then((response: AxiosResponse) => {
            setAttributes(response.data.attributes)
        })
        .catch((error: any) => {
            console.log(error);
        });
        props.feeScheduleApi.getService(serviceId ?? "").then((response: AxiosResponse) => {
            setServiceTitle(response.data.title)
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    function createServiceAttributeLine(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.feeScheduleApi.createServiceAttributeLine(serviceId ?? "", selectedAttribute).then((response: AxiosResponse) => {
            console.log(response);
            setRes(response.statusText);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    const onSelectedAttributeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAttribute(e.currentTarget.value)
    }

    var attributeOptions:any = [];
    if (attributes) {
        attributeOptions = attributes.map(function(attribute, i) {
                return (
                    <option value={attribute.id}>{attribute.title}</option>
                )
            }
        )
    }

    return (
        <Container className="mt-5 w-50">
            <Form 
                onSubmit={createServiceAttributeLine}
            >
                <Form.Group className="mb-3">
                    <Form.Label>{serviceTitle}</Form.Label>
                    <Form.Select onChange={onSelectedAttributeChange}>
                        {attributeOptions}
                    </Form.Select>
                </Form.Group>
                <Button type="submit">Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}