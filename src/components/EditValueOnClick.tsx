import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    Link,
  } from "react-router-dom"
import { Button, Form } from 'react-bootstrap';
import { ChangeEvent } from 'react';
import React from 'react';

type SubmitChangeFunction = (value:string, id:string) => any;
interface Props {
    submitChangeFunction: SubmitChangeFunction,
    value: string,
    id: string
}


export default function EditValueOnClick(props:Props) {
    const [editing, setEditing] = React.useState(false);
    const [value, setValue] = React.useState(props.value);
    const [id] = React.useState(props.id)

    function handleOnValueChange (event: ChangeEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value)
    }

    function startEditing (event: React.MouseEvent<HTMLParagraphElement>) {
        setEditing(true);
    }

    function stopEditing (event: React.MouseEvent<HTMLButtonElement>) {
        setEditing(false);
    }

    return (
        <div className='float-start'>
            <p onClick={startEditing} hidden={editing}>{value}</p>
            <div className="d-flex" hidden={!editing}>
                <Form.Control
                    className="w-50"
                    hidden={!editing}
                    placeholder={value}
                    onChange={handleOnValueChange}
                />
                <Button 
                    hidden={!editing}
                    className="ms-3"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => { stopEditing(e); props.submitChangeFunction(value, id);}}>
                    Edit
                </Button>
                <Button 
                    hidden={!editing}
                    className="ms-3 btn-danger"
                    onClick={stopEditing}>
                    Cancel
                </Button>
            </div>
        </div>
    )
}