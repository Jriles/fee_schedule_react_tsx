import { Button, Container, Form } from "react-bootstrap";
import { CreateServiceVariantSchema, DefaultApi, ServiceAttributeLineResponse, ServiceAttributeValue, ServiceResponse } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, ChangeEventHandler } from "react";

interface CreateServiceVariantProps {
    feeScheduleApi: DefaultApi;
}

export default function CreateServiceVariant(props:CreateServiceVariantProps) {
    interface SelectedServiceAttrVal {
        //where the val here is the service attr val id
        LineId: string,
        ServiceAttrValId: string
    }
    const [res, setRes] = React.useState("");
    const [serviceId, setServiceId] = React.useState("");
    const [services, setServices] = React.useState<ServiceResponse[]>([]);
    const [serviceLines, setServiceLines] = React.useState<ServiceAttributeLineResponse[]>([]);
    const [fee, setFee] = React.useState(0.0);
    const [perPageStateCost, setPerPageStateCost] = React.useState(0.0);
    const [selectedServiceAttrVals, setSelectedServiceAttrVals] = React.useState<SelectedServiceAttrVal[]>([]);

    React.useEffect(() => {
        props.feeScheduleApi.getAllServices().then((response: AxiosResponse) => {
            setServices(response.data.services);
            setServiceId(response.data.services[0].id)
            getAllServiceLines(response.data.services[0].id)
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    function createServiceVariant() {
        const serviceVariantVals: CreateServiceVariantSchema = {
            service_id: serviceId,
            state_cost: fee * 100,
            service_attribute_value_ids: selectedServiceAttrVals.map(val => val.ServiceAttrValId),
            per_page_state_cost: perPageStateCost * 100
        }

        props.feeScheduleApi.createVariant(serviceVariantVals).then((response: AxiosResponse) => {
            setRes(response.statusText);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    // we need to know all the lines for a given service
    function getAllServiceLines (serviceId:string) {
        props.feeScheduleApi.getServiceAttributeLines(serviceId).then((response: AxiosResponse) => {
            setServiceLines(response.data.service_lines);
            var serviceAttrValsToSelect:SelectedServiceAttrVal[] = [];
            for (var line of response.data.service_lines){
                const serviceAttrValToSelect:SelectedServiceAttrVal = {
                    LineId: line.id,
                    ServiceAttrValId: line.service_attribute_values[0].id
                }
                serviceAttrValsToSelect.push(serviceAttrValToSelect)
            }
            setSelectedServiceAttrVals(serviceAttrValsToSelect);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    function renderLineAttrs (line:ServiceAttributeLineResponse) {
        var attrValOptions = null;
        if (line.service_attribute_values != null) {
            attrValOptions = line.service_attribute_values.map(function(attrVal, i) {
                return (
                    <option value={attrVal.id}>{attrVal.value_title}</option>
                )
            })
        }
        return attrValOptions
    }

    function renderServiceAttrLines () {
        var lineOptions:any = [];
        if (serviceLines) {
            lineOptions = serviceLines.map(function(serviceLine, i) {
                    return (
                        <Form.Group className="mb-3">
                            <Form.Label>{serviceLine.attribute_title}</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => onServiceAttrValsChange(e, serviceLine.id)}>
                                {renderLineAttrs(serviceLine)}
                            </Form.Select>
                        </Form.Group>
                    )
                }
            )
            return lineOptions
        }
        return null
    }

    function onServiceAttrValsChange(e: ChangeEvent<HTMLSelectElement>, serviceLineId: string) {
        const serviceAttrValId:string = e.target.value;
        var newSelectedAttrVals = [];
        var newSelectedAttrValPreset = false;
        const newSelectedAttrVal: SelectedServiceAttrVal = {
            LineId: serviceLineId,
            ServiceAttrValId: serviceAttrValId
        }
        for (var selectedServiceAttrVal of selectedServiceAttrVals) {
            if (selectedServiceAttrVal.LineId == serviceLineId)
            {
                newSelectedAttrValPreset = true;
                newSelectedAttrVals.push(newSelectedAttrVal)
            }
            else
            {
                newSelectedAttrVals.push(selectedServiceAttrVal)
            }
        }        

        setSelectedServiceAttrVals(newSelectedAttrVals)
    }

    function onFeeChange(e: ChangeEvent<HTMLInputElement>) {
        setFee(parseFloat(e.target.value))
    }

    function onPerPageStateCostChange(e: ChangeEvent<HTMLInputElement>) {
        setPerPageStateCost(parseFloat(e.target.value))
    }

    function onServiceIdChange(e: ChangeEvent<HTMLSelectElement>) {
        const serviceId:string = e.target.value;
        setServiceId(serviceId)
        getAllServiceLines(serviceId)
    }

    var serviceOptions:any = [];
    if (services) {
        serviceOptions = services.map(function(service, i) {
                return (
                    <option value={service.id}>{service.title}</option>
                )
            }
        )
    }

    return (
        <Container className="mt-5 w-50">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Service</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={onServiceIdChange}>
                        {serviceOptions}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State Cost</Form.Label>
                    <Form.Control type="number" step=".01" onChange={onFeeChange} placeholder="100.00" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Per Page State Cost (Optional)</Form.Label>
                    <Form.Control type="number" step=".01" onChange={onPerPageStateCostChange} placeholder="100.00" />
                </Form.Group>
                <Form.Group className="mb-3">
                    {renderServiceAttrLines()}
                </Form.Group>
                <Button onClick={createServiceVariant}>Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}