import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";
import { CreateAttributeSchema, LoginSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent } from "react";
import { useCookies } from "react-cookie";

export default function LoginForm() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);
    const [cookies, setCookie] = useCookies(['sessionToken']);

    function login() {
        const loginVals: LoginSchema = {
            username: username,
            password: password,
            remember_me: rememberMe
        }
        feeScheduleApi.login(loginVals).then((response: AxiosResponse) => {
            setCookie('sessionToken', response.data.session_token)
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value)
    }

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const onRememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    }

    return (
        <Container className="mt-5 w-50">
            <Form>
                <h1>Login</h1>
                <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={onUsernameChange} placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={onPasswordChange} placeholder="Password" type="password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Remember Me? (stay signed in for a month)</Form.Label>
                    <Form.Check onChange={onRememberMeChange}/>
                </Form.Group>
                <Button onClick={login}>Submit</Button>
            </Form>
        </Container>
    )
}