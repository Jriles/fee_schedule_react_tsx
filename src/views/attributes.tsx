import { Button, Container, ListGroup } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";
import { ServiceResponse } from '../components/api/api';
import { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import EditValueOnClick from "../components/EditValueOnClick";
import ModalComp from "../components/deleteModal";


export default function Attributes() {
    const DELETE_SERVICE_MODAL_HEADER = "Delete Service?";
    const [attributes, setAttributes] = React.useState<ServiceResponse[]>([]);

    React.useEffect(() => {
        feeScheduleApi.getAllAttributes().then((response: AxiosResponse) => {
            setAttributes(response.data.attributes);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    async function deleteAttribute(attrId:string) {
        try {
            await feeScheduleApi.deleteAttribute(attrId);
        } catch (error) {
            console.log(error)
        }
    }

    var listItems;
    if (attributes) {
        listItems = attributes.map(function(attribute, i) {
            return (
                <ListGroup.Item>
                    {attribute.title}
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
            <h1 className="mb-4">Attributes</h1>
            <Link to="create" className="text-white" style={{ textDecoration: 'none' }} >
                <Button className="mb-5">Create Attribute</Button>
            </Link>
            <ListGroup>
                {listItems}
            </ListGroup>
        </Container>
    )
}