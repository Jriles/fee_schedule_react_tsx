import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { DefaultApi, ServiceResponse } from '../components/api/api';
import { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import EditValueOnClick from "../components/EditValueOnClick";
import ModalComp from "../components/deleteModal";

interface AttributesProps {
    feeScheduleApi: DefaultApi;
}

export default function Attributes(props:AttributesProps) {
    const DELETE_SERVICE_MODAL_HEADER = "Delete Service?";
    const [attributes, setAttributes] = React.useState<ServiceResponse[]>([]);

    React.useEffect(() => {
        props.feeScheduleApi.getAllAttributes().then((response: AxiosResponse) => {
            setAttributes(response.data.attributes);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    async function deleteAttribute(attrId:string) {
        try {
            await props.feeScheduleApi.deleteAttribute(attrId);
        } catch (error) {
            console.log(error)
        }
    }

    var listItems;
    if (attributes) {
        listItems = attributes.map(function(attribute, i) {
            return (
                <ListGroup.Item>
                    <Link to={attribute.id}>{attribute.title}</Link>
                    {/* <EditValueOnClick submitChangeFunction={updateService} value={service.title} id={service.id}></EditValueOnClick> */}
                    <ModalComp
                        message={"Are you sure you want to delete attribute " + attribute.title + "?"}
                        header={DELETE_SERVICE_MODAL_HEADER}
                        callback={deleteAttribute}
                        resourceId={attribute.id}
                    />
                </ListGroup.Item>
            )
        })
    }

    return (
        <Container className="mt-5">
            <Row className="mb-5">
                <Col>
                    <h1 className="mb-4">Attributes</h1>
                </Col>
                <Col>
                    <Link to="create" className="text-white float-end" style={{ textDecoration: 'none' }} >
                        <Button className="mb-5">Create Attribute</Button>
                    </Link>
                </Col>
            </Row>

            <ListGroup>
                {listItems}
            </ListGroup>
        </Container>
    )
}