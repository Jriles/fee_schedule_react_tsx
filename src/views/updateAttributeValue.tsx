import { Button, Container, Form } from "react-bootstrap";
import { DefaultApi, UpdateAttributeSchema, UpdateAttributeValueSchema, UpdateServiceSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent } from "react";
import { useLocation, useParams } from "react-router-dom";

interface UpdateAttributeValueProps {
    feeScheduleApi: DefaultApi;
    setCurrentAttrValName(currentAttributeValueName:string): any;
}

export default function UpdateAttributeValue(props:UpdateAttributeValueProps) {
    type UpdateAttributeValueParams = {
        attributeValueId: string;
    }
    type LocationState = {
        currentAttributeValueTitle: string
    }
    const successRes = 'Attribute Value Updated Successfully'

    const location = useLocation()
    const { currentAttributeValueTitle } = location.state as LocationState;
    const [res, setRes] = React.useState("");
    const [attributeTitle, setAttributeTitle] = React.useState("");
    let { attributeValueId } = useParams<UpdateAttributeValueParams>();


    props.setCurrentAttrValName(currentAttributeValueTitle);

    function updateAttributeValue() {
        const attributeVals: UpdateAttributeValueSchema = {
            title: attributeTitle
        }

        props.feeScheduleApi.updateAttributeValue(attributeValueId ?? "", attributeVals).then((response: AxiosResponse) => {
            console.log(response);
            setRes(successRes);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAttributeTitle(e.currentTarget.value)
    }

    return (
        <Container className="mt-5 w-50">
            <h1 className="mb-5">Update Attribute Value</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Attribute Value Name</Form.Label>
                    <Form.Control onChange={onTitleChange} placeholder={currentAttributeValueTitle} />
                </Form.Group>
                <Button onClick={updateAttributeValue}>Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}