import { Button, Container, Form } from "react-bootstrap";
import { DefaultApi, UpdateServiceSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent } from "react";
import { useLocation, useParams } from "react-router-dom";

interface UpdateServiceProps {
    feeScheduleApi: DefaultApi;
}

export default function UpdateService(props:UpdateServiceProps) {
    type UpdateServiceParams = {
        serviceId: string;
    }
    type LocationState = {
        currentServiceTitle: string
    }
    const successRes = 'Service Updated Successfully'


    const location = useLocation()
    const { currentServiceTitle } = location.state as LocationState;
    const [res, setRes] = React.useState("");
    const [serviceTitle, setServiceTitle] = React.useState("");
    let { serviceId } = useParams<UpdateServiceParams>();
    function createService() {
        const serviceVals: UpdateServiceSchema = {
            title: serviceTitle
        }

        props.feeScheduleApi.updateService(serviceId ?? "", serviceVals).then((response: AxiosResponse) => {
            console.log(response);
            setRes(successRes);
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
            <h1 className="mb-5">Update Service</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control onChange={onTitleChange} placeholder={currentServiceTitle} />
                </Form.Group>
                <Button onClick={createService}>Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}