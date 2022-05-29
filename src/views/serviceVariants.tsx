import { Button, Container, ListGroup, Table } from "react-bootstrap";
import { feeScheduleApi } from "../components/feeScheduleApi";
import { ServiceResponse, UpdateServiceSchema, VariantResponse } from '../components/api/api';
import { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import EditValueOnClick from "../components/EditValueOnClick";
import ModalComp from "../components/deleteModal";


export default function ServiceVariants() {
    const DELETE_SERVICE_MODAL_HEADER = "Delete Service?";
    const [serviceVariants, setServiceVariants] = React.useState<VariantResponse[]>([]);

    // function updateService(newTitle:string,serviceId:string) {
    //     const serviceVals: UpdateServiceSchema = {
    //         title: newTitle
    //     }

    //     feeScheduleApi.updateService(serviceId,serviceVals).then((response: AxiosResponse) => {
    //         console.log(response);
    //     })
    //     .catch((error: any) => {
    //         console.log(error);
    //     });
    // }

    function deleteServiceVariant(variantId:string) {
        feeScheduleApi.deleteVariant(variantId).then((response: AxiosResponse) => {
            console.log(response);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    React.useEffect(() => {
        feeScheduleApi.getVariants().then((response: AxiosResponse) => {
            setServiceVariants(response.data.service_variants);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, [])

    var tableItems:any = [];
    if (serviceVariants) {
        tableItems = serviceVariants.map(function(serviceVariant, i) {
                return (
                    <tr>
                        <td>
                            {serviceVariant.service_name}
                        </td>
                        <td>
                            {serviceVariant.fee}
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
            }
        )
    }

    return (
        <Container className="mt-5">
            <Link to="create" className="text-white" style={{ textDecoration: 'none' }} >
                <Button className="mb-5">Create Service Variant</Button>
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>State Cost</th>
                        <th>Variant Values</th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </Table>
        </Container>
    )
}