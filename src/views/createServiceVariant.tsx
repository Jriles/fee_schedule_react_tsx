import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";
import { CreateServiceSchema, CreateServiceVariantSchema, ServiceAttributeLineResponse, ServiceAttributeValue, ServiceResponse } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import { Link } from "react-router-dom";

export default function CreateServiceVariant() {
    const [res, setRes] = React.useState("");
    const [serviceTitle, setServiceTitle] = React.useState("");
    const [serviceId, setServiceId] = React.useState("");
    const [services, setServices] = React.useState<ServiceResponse[]>([]);
    const [serviceLines, setServiceLines] = React.useState<ServiceAttributeLineResponse[]>([]);
    const [serviceAttrVals, setServiceAttrVals] = React.useState<ServiceAttributeValue[]>([]);
    const [fee, setFee] = React.useState(0.0);
    interface SelectedServiceAttrVal {
        //where the val here is the service attr val id
        LineId: string,
        ServiceAttrValId: string
    }
    const [selectedServiceAttrVals, setSelectedServiceAttrVals] = React.useState<SelectedServiceAttrVal[]>([]);

    React.useEffect(() => {
        feeScheduleApi.getAllServices().then((response: AxiosResponse) => {
            setServices(response.data.services);
            setServiceId(services[0].id)
            getAllServiceLines(serviceId)
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    function createServiceVariant() {
        console.log(selectedServiceAttrVals)
        const serviceVariantVals: CreateServiceVariantSchema = {
            serviceId: serviceId,
            fee: fee,
            serviceAttributeValueIds: selectedServiceAttrVals.map(val => val.ServiceAttrValId)
        }

        feeScheduleApi.createVariant(serviceVariantVals).then((response: AxiosResponse) => {
            console.log(response);
            setRes(response.statusText);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    // we need to know all the lines for a given service
    function getAllServiceLines (serviceId:string) {
        feeScheduleApi.getServiceAttributeLines(serviceId).then((response: AxiosResponse) => {
            setServiceLines(response.data.service_lines);
            var serviceAttrValsToSelect:SelectedServiceAttrVal[] = [];
            for (var line of response.data.service_lines){
                feeScheduleApi.getServiceAttrVals(line.id).then((response: AxiosResponse) => {
                    const lineAttrVals:ServiceAttributeValue[] = response.data.attribute_values
                    setServiceAttrVals(serviceAttrVals.concat(lineAttrVals));
                    const serviceAttrValToSelect:SelectedServiceAttrVal = {
                        LineId: line.id,
                        ServiceAttrValId: lineAttrVals[0].id
                    }
                    serviceAttrValsToSelect.push(serviceAttrValToSelect)
                })
                .catch((error: any) => {
                    console.log(error);
                });
            }
            console.log(serviceAttrValsToSelect)
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

    var serviceOptions:any = [];
    if (services) {
        serviceOptions = services.map(function(service, i) {
                return (
                    <option value={service.id}>{service.title}</option>
                )
            }
        )
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
        
        if (!newSelectedAttrValPreset) {
            newSelectedAttrVals.push(newSelectedAttrVal)
        }

        setSelectedServiceAttrVals(newSelectedAttrVals)
    }

    function onFeeChange(e: ChangeEvent<HTMLInputElement>) {
        setFee(parseFloat(e.target.value))
    }

    function onServiceIdChange(e: ChangeEvent<HTMLSelectElement>) {
        const serviceId:string = e.target.value;
        setServiceId(serviceId)
        getAllServiceLines(serviceId)
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
                    <Form.Label>Variant State Cost</Form.Label>
                    <Form.Control type="number" onChange={onFeeChange} placeholder="100.00" />
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