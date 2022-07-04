import { Button, Container, Form } from "react-bootstrap";
import { DefaultApi, UpdateAttributeSchema, UpdateServiceSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent } from "react";
import { useLocation, useParams } from "react-router-dom";

interface UpdateAttributeProps {
    feeScheduleApi: DefaultApi;
}

export default function UpdateAttribute(props:UpdateAttributeProps) {
    type UpdateAttributeParams = {
        attributeId: string;
    }
    type LocationState = {
        currentAttributeTitle: string
    }
    const successRes = 'Attribute Updated Successfully'


    const location = useLocation()
    const { currentAttributeTitle } = location.state as LocationState;
    const [res, setRes] = React.useState("");
    const [attributeTitle, setAttributeTitle] = React.useState("");
    let { attributeId } = useParams<UpdateAttributeParams>();
    function updateAttribute() {
        const attributeVals: UpdateAttributeSchema = {
            title: attributeTitle
        }

        props.feeScheduleApi.updateAttribute(attributeId ?? "", attributeVals).then((response: AxiosResponse) => {
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
            <h1 className="mb-5">Update Attribute</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Attribute Name</Form.Label>
                    <Form.Control onChange={onTitleChange} placeholder={currentAttributeTitle} />
                </Form.Group>
                <Button onClick={updateAttribute}>Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}