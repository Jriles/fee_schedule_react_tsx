import { Button, Container, ListGroup } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";

var services = [];
feeScheduleApi.getAllServices.then((response) => {
    services = response['Services'];
})
.catch((error) => {
    console.log(error);
});
export default function Services() {
    return (
        <Container className="mt-5">
            <ListGroup>
                <ListGroup.Item>Test</ListGroup.Item>
                <ListGroup.Item>Test</ListGroup.Item>
                <ListGroup.Item>Test</ListGroup.Item>
                <ListGroup.Item>Test</ListGroup.Item>
                <ListGroup.Item>Test</ListGroup.Item>
                <ListGroup.Item>Test</ListGroup.Item>
                <ListGroup.Item><Button>Test</Button></ListGroup.Item>
            </ListGroup>
        </Container>
    )
}