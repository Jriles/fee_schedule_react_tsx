import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { AttributeValueResponse, CreateServiceAttributeValueSchema, CreateServiceSchema, DefaultApi } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, ChangeEventHandler, FormEvent } from "react";
import { useParams } from "react-router-dom";
import CreateServiceAttributeValueForm from "../components/forms/createServiceAttributeValueForm";

interface CreateServiceAttributeLineProps {
    feeScheduleApi: DefaultApi;
}

export default function CreateServiceAttributeValue(props:CreateServiceAttributeLineProps) {
    type ServiceAttributeValueParams = {
        lineId: string;
    }
    let { lineId } = useParams<ServiceAttributeValueParams>();

    return (
        <CreateServiceAttributeValueForm lineId={lineId ?? ""} feeScheduleApi={props.feeScheduleApi}></CreateServiceAttributeValueForm>
    )
}