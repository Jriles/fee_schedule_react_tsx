import { Button, Container, Form } from "react-bootstrap";
import { AttributeValueResponse, CreateServiceAttributeValueSchema, DefaultApi } from '../api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, FormEvent } from "react";

type Callback = () => void;
interface CreateServiceAttributeValueFormProps {
    feeScheduleApi: DefaultApi,
    callback?: Callback,
    lineId: string
}

export default function CreateServiceAttributeValueForm(props:CreateServiceAttributeValueFormProps) {
    const [res, setRes] = React.useState("");
    const [attributeValues, setAttributeValues] = React.useState<AttributeValueResponse[]>([]);
    const [attributeTitle, setAttributeTitle] = React.useState("");
    const [selectedAttributeValueId, setSelectedAttributeValueId] = React.useState("");

    React.useEffect(() => {
        props.feeScheduleApi.getServiceAttributeLine(props.lineId ?? "").then((response: AxiosResponse) => {
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

        props.feeScheduleApi.createServiceAttributeValue(props.lineId ?? "", serviceAttrVal).then((response: AxiosResponse) => {
            setRes(response.statusText);
            // call callback if exists
            if (props.callback != undefined) props.callback()
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