import { Button, Container, ListGroup } from "react-bootstrap";
import { DefaultApi, ServiceAttributeLineResponse, ServiceResponse, UpdateServiceSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import ModalComp from "../components/deleteModal";

interface ServiceLinesProps {
    feeScheduleApi: DefaultApi;
}

export default function ServiceLines(props:ServiceLinesProps) {
    const DELETE_SERVICE_MODAL_HEADER = "Delete Service Line?";
    const DELETE_SERVICE_LINE_MODAL_BODY = "Are you sure you want to delete service line for ";
    type ServiceLineParams = {
        serviceId: string;
    }
    const [serviceLines, setServiceLines] = React.useState<ServiceAttributeLineResponse[]>([]);
    const [serviceTitle, setServiceTitle] = React.useState("");
    
    let { serviceId } = useParams<ServiceLineParams>();

    React.useEffect(() => {
        props.feeScheduleApi.getService(serviceId ?? "").then((response: AxiosResponse) => {
            setServiceTitle(response.data.title);
        })
        .catch((error: any) => {
            console.log(error);
        });

        props.feeScheduleApi.getServiceAttributeLines(serviceId ?? "").then((response: AxiosResponse) => {
            setServiceLines(response.data.service_lines);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    async function deleteServiceLine(lineId:string) {
        try {
            await props.feeScheduleApi.deleteServiceAttributeLine(lineId);
        } catch (error) {
            console.log(error)
        }
    }

    var listItems;
    if (serviceLines) {
        listItems = serviceLines.map(function(line, i) {
                return (
                    <ListGroup.Item>
                        <Link to={"lines/" + line.id} className="text-black" style={{ textDecoration: 'none' }}>{line.attribute_title}</Link>
                        <ModalComp
                            message={DELETE_SERVICE_LINE_MODAL_BODY + line.attribute_title + "?"}
                            header={DELETE_SERVICE_MODAL_HEADER}
                            callback={deleteServiceLine}
                            resourceId={line.id}
                        />
                    </ListGroup.Item>
                )
            }
        )
    }
    return (
        <Container className="mt-5">
            <h1 className="mb-4">{serviceTitle}</h1>
            <Link to="create" className="text-white" style={{ textDecoration: 'none' }} >
                <Button className="mb-5">Create Service Line</Button>
            </Link>
            <ListGroup>
                {listItems}
            </ListGroup>
        </Container>
    )
}