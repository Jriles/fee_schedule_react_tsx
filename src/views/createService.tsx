import { DefaultApi } from '../components/api/api';
import React from "react";
import CreateServiceForm from "../components/forms/createServiceForm";

interface CreateServiceProps {
    feeScheduleApi: DefaultApi;
}

export default function CreateService(props:CreateServiceProps) {
    return (
        <CreateServiceForm feeScheduleApi={props.feeScheduleApi}></CreateServiceForm>
    )
}