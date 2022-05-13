import { Button, Container, ListGroup } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";
import { ServiceResponse } from '../components/api/api';
import { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
    const [services, setServices] = React.useState<ServiceResponse[]>([]);

    React.useEffect(() => {
        feeScheduleApi.getAllServices().then((response: AxiosResponse) => {
            setServices(response.data.services);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    if (!services) return null;
    console.log(services)

    var listItems = [];
    for (var i = 0; i < services.length; i++) {
        listItems.push(
            <ListGroup.Item>{services[i].title}</ListGroup.Item>
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