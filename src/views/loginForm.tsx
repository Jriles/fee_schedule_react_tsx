import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { CreateAttributeSchema, DefaultApi, LoginSchema } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent } from "react";
import { Cookies } from 'react-cookie';
import CreateFeeScheduleApiClient from "../components/feeScheduleApi";
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
    cookies: Cookies;
    feeScheduleApi: DefaultApi;
    setFeeScheduleApi(feeScheduleApi:DefaultApi): any;
}

export default function LoginForm(props:LoginFormProps) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);
    const navigate = useNavigate();

    function login() {
        const loginVals: LoginSchema = {
            username: username,
            password: password,
            remember_me: rememberMe
        }
        props.feeScheduleApi.login(loginVals).then((response: AxiosResponse) => {
            const { cookies } = props;
            const sessionToken = response.data.session_token;
            const userId = response.data.user_id;
            cookies.set('sessionToken', sessionToken)
            cookies.set('userId', userId)
            console.log(userId)
            props.setFeeScheduleApi(CreateFeeScheduleApiClient({
                sessionToken: sessionToken,
                userId: userId
            }))
            navigate('/services');
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