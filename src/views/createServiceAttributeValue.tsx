import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { AttributeValueResponse, CreateServiceAttributeValueSchema, CreateServiceSchema, DefaultApi } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, ChangeEventHandler, FormEvent } from "react";
import { useParams } from "react-router-dom";

interface CreateServiceAttributeLineProps {
    feeScheduleApi: DefaultApi;
}

export default function CreateServiceAttributeValue(props:CreateServiceAttributeLineProps) {
    type ServiceAttributeValueParams = {
        lineId: string;
    }
    const [res, setRes] = React.useState("");
    const [attributeValues, setAttributeValues] = React.useState<AttributeValueResponse[]>([]);
    const [attributeTitle, setAttributeTitle] = React.useState("");
    const [selectedAttributeValueId, setSelectedAttributeValueId] = React.useState("");
    let { lineId } = useParams<ServiceAttributeValueParams>();

    React.useEffect(() => {
        props.feeScheduleApi.getServiceAttributeLine(lineId ?? "").then((response: AxiosResponse) => {
            setAttributeTitle(response.data.attribute_title)
            props.feeScheduleApi.getAllAttributeValues(response.data.attribute_id).then((response: AxiosResponse) => {
                setAttributeValues(response.data.attribute_values);
                setSelectedAttributeValueId(response.data.attribute_values[0].id)
            })
            .catch((error: any) => {
                console.log(error);
            });
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    function createServiceAttributeValue(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const serviceAttrVal: CreateServiceAttributeValueSchema = {
            attributeValueId: selectedAttributeValueId
        }

        props.feeScheduleApi.createServiceAttributeValue(lineId ?? "", serviceAttrVal).then((response: AxiosResponse) => {
            console.log(response);
            setRes(response.statusText);
        })
        .catch((error: any) => {
            setRes(error.response.data.errMsg)
            console.log(error);
        });
    }

    const onSelectedAttributeValueIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAttributeValueId(e.currentTarget.value)
    }

    var attributeValueOptions:any = [];
    if (attributeValues) {
        attributeValueOptions = attributeValues.map(function(attributeValue, i) {
                return (
                    <option value={attributeValue.id}>{attributeValue.title}</option>
                )
            }
        )
    }

    return (
        <Container className="mt-5 w-50">
            <Form onSubmit={createServiceAttributeValue}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{attributeTitle}</Form.Label>
                    <Form.Select onChange={onSelectedAttributeValueIdChange}>
                        {attributeValueOptions}
                    </Form.Select>
                </Form.Group>
                <Button type="submit">Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}