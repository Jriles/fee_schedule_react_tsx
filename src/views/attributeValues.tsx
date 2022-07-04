import { Button, Container, Dropdown, ListGroup } from "react-bootstrap";
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
                        <Link to={'values/' + attrVal.id} state={{ currentAttributeValueTitle: attrVal.title }}>{attrVal.title}</Link>
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
            <div className="row mb-5">
                <div className="col">
                    <h1 className="mb-4">{attributeTitle}</h1>
                </div>
                <div className="col">
                    <Dropdown className="float-end">
                        <Dropdown.Toggle id="dropdown-basic">
                            Update Attribute
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link to="update" style={{ textDecoration: 'none' }} state={{ currentAttributeTitle: attributeTitle }}>
                                <Dropdown.Item href="#/update">
                                    Update Attribute Name
                                </Dropdown.Item>
                            </Link>
                            <Link to="create" style={{ textDecoration: 'none' }} >
                                <Dropdown.Item href="#/create">Create Attribute Value</Dropdown.Item>
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <ListGroup>
                {listItems}
            </ListGroup>
        </Container>
    )
}