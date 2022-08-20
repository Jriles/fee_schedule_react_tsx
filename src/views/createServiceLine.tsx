import { DefaultApi } from '../components/api/api';
import React from "react";
import { useParams } from "react-router-dom";
import CreateServiceAttributeLineForm from "../components/forms/createServiceAttributeLineForm";

interface CreateServiceAttributeLineProps {
    feeScheduleApi: DefaultApi;
}

export default function CreateServiceAttributeLine(props:CreateServiceAttributeLineProps) {
    type ServiceAttributeLineParams = {
        serviceId: string;
    }
    let { serviceId } = useParams<ServiceAttributeLineParams>();

    return (
        <CreateServiceAttributeLineForm feeScheduleApi={props.feeScheduleApi} serviceId={serviceId ?? ""}></CreateServiceAttributeLineForm>
    )
}