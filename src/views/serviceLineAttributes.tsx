import { Button, Container, ListGroup } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";
import { ServiceAttributeLineResponse, ServiceAttributeValue, ServiceResponse, UpdateServiceSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ModalComp from "../components/deleteModal";


export default function ServiceAttributeValues() {
    const DELETE_SERVICE_MODAL_HEADER = "Delete Service Attribute Value?";
    const DELETE_SERVICE_LINE_MODAL_BODY = "Are you sure you want to delete service attribute value for ";
    type ServiceAttributeValuesParams = {
        lineId: string;
    }
    const [serviceAttrVals, setServiceAttrVals] = React.useState<ServiceAttributeValue[]>([]);
    const [attributeTitle, setAttributeTitle] = React.useState("");
    
    let { lineId } = useParams<ServiceAttributeValuesParams>();

    React.useEffect(() => {
        feeScheduleApi.getServiceAttributeLine(lineId ?? "").then((response: AxiosResponse) => {
            setServiceAttrVals(response.data.service_attribute_values);
            setAttributeTitle(response.data.attribute_title)
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    async function deleteServiceAttributeVal(valueId:string) {
        try {
            await feeScheduleApi.deleteServiceAttributeValue(valueId);
        } catch (error) {
            console.log(error)
        }
    }

    var listItems;
    if (serviceAttrVals) {
        listItems = serviceAttrVals.map(function(serviceAttrVal, i) {
                return (
                    <ListGroup.Item className="d-inline">
                        {serviceAttrVal.value_title}
                        <ModalComp
                            message={DELETE_SERVICE_LINE_MODAL_BODY + serviceAttrVal.value_title + "?"}
                            header={DELETE_SERVICE_MODAL_HEADER}
                            callback={deleteServiceAttributeVal}
                            resourceId={serviceAttrVal.id}
                        />
                    </ListGroup.Item>
                )
            }
        )
    }
    return (
        <Container className="mt-5">
            <h1 className="mb-4">{attributeTitle}</h1>
            <Link to="create" className="text-white" style={{ textDecoration: 'none' }} >
                <Button className="mb-5">Create Service Attribute Value</Button>
            </Link>
            <ListGroup>
                {listItems}
            </ListGroup>
        </Container>
    )
}