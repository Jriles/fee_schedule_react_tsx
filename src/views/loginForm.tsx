import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";
import { CreateAttributeSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent } from "react";

export default function LoginForm() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    function login() {
        // feeScheduleApi.createAttribute().then((response: AxiosResponse) => {
        // })
        // .catch((error: any) => {
        //     console.log(error);
        // });
    }

    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value)
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    return (
        <Container className="mt-5 w-50">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={onUsernameChange} placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={onUsernameChange} placeholder="Password" type="password"/>
                </Form.Group>
                <Button onClick={login}>Submit</Button>
            </Form>
        </Container>
    )
}