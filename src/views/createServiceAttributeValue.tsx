import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";
import { AttributeValueResponse, CreateServiceAttributeValueSchema, CreateServiceSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import { useParams } from "react-router-dom";

export default function CreateServiceAttributeValue() {
    type ServiceAttributeValueParams = {
        lineId: string;
    }
    const [res, setRes] = React.useState("");
    const [attributeValues, setAttributeValues] = React.useState<AttributeValueResponse[]>([]);
    const [attributeTitle, setAttributeTitle] = React.useState("");
    const [attributeId, setAttributeId] = React.useState("");
    const [selectedAttributeValueId, setSelectedAttributeValueId] = React.useState("");
    let { lineId } = useParams<ServiceAttributeValueParams>();

    React.useEffect(() => {
        feeScheduleApi.getServiceAttributeLine(lineId ?? "").then((response: AxiosResponse) => {
            setAttributeTitle(response.data.attribute_title)
            setAttributeId(response.data.attribute_id)
            feeScheduleApi.getAllAttributeValues(attributeId).then((response: AxiosResponse) => {
                setAttributeValues(response.data.attribute_values);
            })
            .catch((error: any) => {
                console.log(error);
            });
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    function createServiceAttributeValue() {
        const serviceAttrVal: CreateServiceAttributeValueSchema = {
            attributeValueId: selectedAttributeValueId
        }

        feeScheduleApi.createServiceAttributeValue(lineId ?? "", serviceAttrVal).then((response: AxiosResponse) => {
            console.log(response);
            setRes(response.statusText);
        })
        .catch((error: any) => {
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
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{attributeTitle}</Form.Label>
                    <Form.Select onChange={onSelectedAttributeValueIdChange}>
                        {attributeValueOptions}
                    </Form.Select>
                </Form.Group>
                <Button onClick={createServiceAttributeValue}>Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}