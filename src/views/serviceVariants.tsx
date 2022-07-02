import { Button, Container, ListGroup, Pagination, Table } from "react-bootstrap";
import { DefaultApi, ServiceResponse, UpdateServiceSchema, VariantResponse } from '../components/api/api';
import { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import EditValueOnClick from "../components/EditValueOnClick";
import ModalComp from "../components/deleteModal";

interface ServiceVariantsProps {
    feeScheduleApi: DefaultApi;
}

export default function ServiceVariants(props:ServiceVariantsProps) {
    const DELETE_SERVICE_MODAL_HEADER = "Delete Service?";
    const [serviceVariants, setServiceVariants] = React.useState<VariantResponse[]>([]);
    const [pageNum, setPageNum] = React.useState(1);

    React.useEffect(() => {
        props.feeScheduleApi.getVariants([],pageNum).then((response: AxiosResponse) => {
            setServiceVariants(response.data.service_variants);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    async function deleteServiceVariant(variantId:string) {
        try {
            await props.feeScheduleApi.deleteVariant(variantId);
        } catch (error) {
            console.log(error)
        }
    }

    var tableItems:any = [];
    if (serviceVariants) {
        tableItems = serviceVariants.map(function(serviceVariant, i) {
            return (
                <tr>
                    <td>
                        {serviceVariant.service_name}
                    </td>
                    <td>
                        ${serviceVariant.state_cost}
                    </td>
                    <td>
                        ${serviceVariant.per_page_state_cost}
                    </td>
                    <td>
                        {serviceVariant.service_attribute_vals?.join(', ')}
                    </td>
                    <td>
                        <ModalComp
                            message={"Are you sure you want to delete variant?"}
                            header={DELETE_SERVICE_MODAL_HEADER}
                            callback={deleteServiceVariant}
                            resourceId={serviceVariant.id}
                        />
                    </td>
                </tr>
            )
        })
    }

    function onPageChange(newPageNum:number) {
        setPageNum(newPageNum)
        props.feeScheduleApi.getVariants([],newPageNum).then((response: AxiosResponse) => {
            setServiceVariants(response.data.service_variants);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item onClick={() => onPageChange(number)} key={number} active={number === pageNum}>
            {number}
            </Pagination.Item>,
        );
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Service Variants</h1>
            <Link to="create" className="text-white" style={{ textDecoration: 'none' }} >
                <Button className="mb-5">Create Service Variant</Button>
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>State Cost</th>
                        <th>Per Page State Cost</th>
                        <th>Variant Values</th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </Table>
            <Pagination>{items}</Pagination>
        </Container>
    )
}