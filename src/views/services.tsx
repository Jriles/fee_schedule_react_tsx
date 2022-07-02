import { Button, Container, ListGroup } from "react-bootstrap";
import { DefaultApi, ServiceResponse, UpdateServiceSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import EditValueOnClick from "../components/EditValueOnClick";
import ModalComp from "../components/deleteModal";
import { Cookies } from 'react-cookie';

interface ServicesProps {
    feeScheduleApi: DefaultApi;
}

export default function Services(props:ServicesProps) {
    const DELETE_SERVICE_MODAL_HEADER = "Delete Service?";
    const [services, setServices] = React.useState<ServiceResponse[]>([]);

    React.useEffect(() => {
        props.feeScheduleApi.getAllServices().then((response: AxiosResponse) => {
            setServices(response.data.services);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    async function deleteService(serviceId:string) {
        try {
            await props.feeScheduleApi.deleteService(serviceId);
        } catch (error) {
            console.log(error)
        }
    }

    var listItems;
    if (services) {
        listItems = services.map(function(service, i) {
                return (
                    <ListGroup.Item>
                        <Link to={service.id} className="text-black" style={{ textDecoration: 'none' }}>{service.title}</Link>
                        <ModalComp
                            message={"Are you sure you want to delete service " + service.title + "?"}
                            header={DELETE_SERVICE_MODAL_HEADER}
                            callback={deleteService}
                            resourceId={service.id}
                        />
                    </ListGroup.Item>
                )
            }
        )
    }
    return (
        <Container className="mt-5">
            <h1 className="mb-4">Services</h1>
            <Link to="create" className="text-white" style={{ textDecoration: 'none' }} >
                <Button className="mb-5">Create Service</Button>
            </Link>
            <ListGroup>
                {listItems}
            </ListGroup>
        </Container>
    )
}