import { Button, Container, ListGroup } from "react-bootstrap";
import { AttributeValueResponse, DefaultApi } from '../components/api/api';
import { AxiosResponse } from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ModalComp from "../components/deleteModal";

interface AttributeValuesProps {
    feeScheduleApi: DefaultApi;
}

export default function AttributeValues(props:AttributeValuesProps) {
    const DELETE_SERVICE_MODAL_HEADER = "Delete Attribute Value?";
    const DELETE_SERVICE_LINE_MODAL_BODY = "Are you sure you want to delete attribute value ";
    type AttributeValuesParams = {
        attributeId: string;
    }
    const [attrVals, setAttrVals] = React.useState<AttributeValueResponse[]>([]);
    const [attributeTitle, setAttributeTitle] = React.useState("");
    
    let { attributeId } = useParams<AttributeValuesParams>();

    React.useEffect(() => {
        props.feeScheduleApi.getAllAttributeValues(attributeId ?? "").then((response: AxiosResponse) => {
            setAttrVals(response.data.attribute_values);
        })
        .catch((error: any) => {
            console.log(error);
        });
        props.feeScheduleApi.getAttribute(attributeId ?? "").then((response: AxiosResponse) => {
            setAttributeTitle(response.data.title)
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    async function deleteAttributeVal(valueId:string) {
        try {
            await props.feeScheduleApi.deleteAttributeValue(valueId);
        } catch (error) {
            console.log(error)
        }
    }

    var listItems;
    if (attrVals) {
        listItems = attrVals.map(function(attrVal, i) {
                return (
                    <ListGroup.Item className="d-inline">
                        {attrVal.title}
                        <ModalComp
                            message={DELETE_SERVICE_LINE_MODAL_BODY + attrVal.title + "?"}
                            header={DELETE_SERVICE_MODAL_HEADER}
                            callback={deleteAttributeVal}
                            resourceId={attrVal.id}
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