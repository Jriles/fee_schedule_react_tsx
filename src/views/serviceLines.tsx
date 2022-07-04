import { Button, Container, Dropdown, ListGroup } from "react-bootstrap";
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
            <div className="row mb-5">
                <div className="col">
                    <h1 className="">{serviceTitle}</h1>
                </div>
                <div className="col">
                    <Dropdown className="float-end">
                        <Dropdown.Toggle id="dropdown-basic">
                            Update Service
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link to="update" style={{ textDecoration: 'none' }} state={{ currentServiceTitle: serviceTitle }}>
                                <Dropdown.Item href="#/update">
                                    Update Service Name
                                </Dropdown.Item>
                            </Link>
                            <Link to="create" style={{ textDecoration: 'none' }} >
                                <Dropdown.Item href="#/create">Create Service Line</Dropdown.Item>
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div>
                <ListGroup>
                    {listItems}
                </ListGroup>
            </div>
        </Container>
    )
}