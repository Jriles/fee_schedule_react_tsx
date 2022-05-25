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
    interface SelectedServiceAttrVal {
        //where the val here is the service attr val id
        LineId: string,
        ServiceAttrValId: string
    }
    const [selectedServiceAttrVals, setSelectedServiceAttrVals] = React.useState<SelectedServiceAttrVal[]>([]);

    React.useEffect(() => {
        feeScheduleApi.getAllServices().then((response: AxiosResponse) => {
            setServices(response.data.services);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    function createServiceVariant() {
        console.log(selectedServiceAttrVals)
        const serviceVariantVals: CreateServiceVariantSchema = {
            serviceId: serviceId,
            fee: 100,
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
            console.log(response);
            setServiceLines(response.data.service_lines);
        })
        .catch((error: any) => {
            console.log(error);
        });
        
        for (var line of serviceLines){
            feeScheduleApi.getServiceAttrVals(line.id).then((response: AxiosResponse) => {
                setServiceAttrVals(serviceAttrVals.concat(response.data.attribute_values));
            })
            .catch((error: any) => {
                console.log(error);
            });
        }
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
                        <div>
                            <p>{serviceLine.attribute_title}</p>
                            <Form.Select aria-label="Default select example" onChange={(e) => onServiceAttrValsChange(e, serviceLine.id)}>
                                {renderLineAttrs(serviceLine)}
                            </Form.Select>
                        </div>
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

    function onServiceIdChange(e: ChangeEvent<HTMLSelectElement>) {
        const serviceId:string = e.target.value;
        setServiceId(serviceId)
        getAllServiceLines(serviceId)
    }

    return (
        <Container className="mt-5 w-50">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Select aria-label="Default select example" onChange={onServiceIdChange}>
                        {serviceOptions}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    {renderServiceAttrLines()}
                </Form.Group>
                <Button onClick={createServiceVariant}>Submit</Button>
                <p>{res}</p>
            </Form>
        </Container>
    )
}