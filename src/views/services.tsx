import { Button, Container, ListGroup } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";
import { ServiceResponse, UpdateServiceSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import EditValueOnClick from "../components/EditValueOnClick";
import ModalComp from "../components/deleteModal";


export default function Services() {
    const DELETE_SERVICE_MODAL_HEADER = "Delete Service?";
    const [services, setServices] = React.useState<ServiceResponse[]>([]);

    function updateService(newTitle:string,serviceId:string) {
        const serviceVals: UpdateServiceSchema = {
            title: newTitle
        }

        feeScheduleApi.updateService(serviceId,serviceVals).then((response: AxiosResponse) => {
            console.log(response);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    async function deleteService(serviceId:string) {
        try {
            await feeScheduleApi.deleteService(serviceId);
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        feeScheduleApi.getAllServices().then((response: AxiosResponse) => {
            setServices(response.data.services);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    var listItems;
    if (services) {
        listItems = services.map(function(service, i) {
                return (
                    <ListGroup.Item>
                        <EditValueOnClick submitChangeFunction={updateService} value={service.title} id={service.id}></EditValueOnClick>
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
            <Link to="create" className="text-white" style={{ textDecoration: 'none' }} >
                <Button className="mb-5">Create Service</Button>
            </Link>
            <ListGroup>
                {listItems}
            </ListGroup>
        </Container>
    )
}