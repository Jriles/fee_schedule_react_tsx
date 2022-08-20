import { Button, Container, Form } from "react-bootstrap";
import { AttributeResponse, DefaultApi } from '../api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, FormEvent } from "react";

type Callback = () => void;
interface CreateServiceAttributeLineFormProps {
    feeScheduleApi: DefaultApi,
    serviceId: string,
    callback?: Callback
}

export default function CreateServiceAttributeLineForm(props:CreateServiceAttributeLineFormProps) {
    const [res, setRes] = React.useState("");
    const [attributes, setAttributes] = React.useState<AttributeResponse[]>([]);
    const [serviceTitle, setServiceTitle] = React.useState("");
    const [selectedAttribute, setSelectedAttribute] = React.useState("")

    React.useEffect(() => {
        props.feeScheduleApi.getAllAttributes().then((response: AxiosResponse) => {
            setAttributes(response.data.attributes)
        })
        .catch((error: any) => {
            console.log(error);
        });
        props.feeScheduleApi.getService(props.serviceId ?? "").then((response: AxiosResponse) => {
            setServiceTitle(response.data.title)
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    function createServiceAttributeLine(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.feeScheduleApi.createServiceAttributeLine(props.serviceId ?? "", selectedAttribute).then((response: AxiosResponse) => {
            setRes(response.statusText);
            // call callback if exists
            if (props.callback != undefined) props.callback()
        })
        .catch((error: any) => {
            setRes(error.response.data.errMsg)
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