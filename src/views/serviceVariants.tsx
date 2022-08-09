import { Button, CloseButton, Col, Container, Dropdown, Form, ListGroup, Pagination, Row, Table } from "react-bootstrap";
import { AttributeResponse, DefaultApi, ServiceResponse, UpdateServiceSchema, VariantResponse } from '../components/api/api';
import { AxiosResponse } from "axios";
import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import EditValueOnClick from "../components/EditValueOnClick";
import ModalComp from "../components/deleteModal";

interface ServiceVariantsProps {
    feeScheduleApi: DefaultApi;
}

export default function ServiceVariants(props:ServiceVariantsProps) {
    const DELETE_SERVICE_MODAL_HEADER = 'Delete Service?';
    const SERVICE_FILTER_NAME = 'Service';
    const SERVICE_FILTER_ID = 'serviceFilter';
    const SERVICE_FILTER_TYPE = 'service';
    const ATTRIBUTE_VALUE_FILTER_TYPE = 'attribute_value';
    const [serviceVariants, setServiceVariants] = React.useState<VariantResponse[]>([]);
    const [pageNum, setPageNum] = React.useState(1);

    interface FilterOption {
        name: string;
        id: string;
    }

    interface Filter {
        name: string;
        options: FilterOption[]
        selectedOption?: string
        filterType: string
    }

    interface FilterDict {
        [id: string] : Filter
    }

    const [filters, setFilters] = React.useState<FilterDict>({});
    const [selectedFilters, setSelectedFilters] = React.useState<FilterDict>({});

    React.useEffect(() => {
        console.log('called useeffect')
        let attributeValueIds:any[] = Object.keys(selectedFilters).map(function(filterId, i) {
            const selectedFilter:Filter = selectedFilters[filterId];
            if (selectedFilter.filterType == ATTRIBUTE_VALUE_FILTER_TYPE) {
                return selectedFilter.selectedOption
            }
        })
        attributeValueIds = attributeValueIds.filter(x => x !== undefined);

        const selectedServiceFilter:any = selectedFilters[SERVICE_FILTER_ID];
        let serviceId:string = '';
        if (selectedServiceFilter) {
            serviceId = selectedServiceFilter.selectedOption
        }
        console.log(attributeValueIds)
        props.feeScheduleApi.getVariants(attributeValueIds,pageNum,serviceId).then((response: AxiosResponse) => {
            console.log(response.data.service_variants)
            setServiceVariants(response.data.service_variants);
        })
        .catch((error: any) => {
            console.log(error);
        });

        const fetchFilterData = async () => {
            let filtersToLoad : FilterDict = {};
            const serviceRes:any = await props.feeScheduleApi.getAllServices()
            const serviceFilterOptions:FilterOption[] = convertResourcesToFilterOptions(serviceRes.data.services)
            const firstServiceFilterOptionId:any = serviceFilterOptions.length > 0 ? serviceFilterOptions[0].id : null
            const serviceFilter : Filter = {
                name: SERVICE_FILTER_NAME,
                options: serviceFilterOptions,
                selectedOption: firstServiceFilterOptionId,
                filterType: SERVICE_FILTER_TYPE
            }
            filtersToLoad[SERVICE_FILTER_ID] = serviceFilter;

            const attributesRes:any = await props.feeScheduleApi.getAllAttributes()
            const attributes : any[] = attributesRes.data.attributes;
            for (const attribute of attributes) {
                const attributeValuesRes:any = await props.feeScheduleApi.getAllAttributeValues(attribute.id);
                const attributeValues : any[] = attributeValuesRes.data.attribute_values
                const attributeFilterOptions = convertResourcesToFilterOptions(attributeValues);
                const firstAttributeFilterOptionId = attributeFilterOptions.length > 0 ? attributeFilterOptions[0].id : null
                const attributeFilter : Filter = {
                    name: attribute.title,
                    options: attributeFilterOptions,
                    selectedOption: firstAttributeFilterOptionId,
                    filterType: ATTRIBUTE_VALUE_FILTER_TYPE
                }
                filtersToLoad[attribute.id] = attributeFilter
            }
            setFilters(filtersToLoad)
        }

        fetchFilterData()
            .catch(console.error);
    }, [selectedFilters]) 

    function convertResourcesToFilterOptions (resources:any) {
        return resources.map(function(resource:any, i:number) {
            const filterOption : FilterOption = {
                name: resource.title,
                id: resource.id,
            }
            return filterOption
        })
    }

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
                        ${serviceVariant.state_cost / 100}
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

    const RenderFilters = () => {
        return Object.keys(filters).map(function(filterId, i) {
            const filter = filters[filterId];
            return (
                <>
                    <Dropdown.Item onClick={() => handleSelectFilter(filterId)}>{filter.name}</Dropdown.Item>
                </>
            )
        })
    }

    const RenderFilterOptions = (filterOptions:FilterOption[]) => {
        return filterOptions.map(function(filterOption, i) {
            return (
                <>
                    <option value={filterOption.id}>{filterOption.name}</option>
                </>
            )
        })
    }

    const RenderSelectedFilters = () => {
        return Object.keys(selectedFilters).map(function(filterId, i) {
            const selectedFilter:Filter = selectedFilters[filterId];
            return (
                <Col sm={2}>
                    <div className="mb-2">
                        {selectedFilter.name}
                        <CloseButton className="float-end" onClick={() => handleDeSelectFilter(filterId)}/>
                    </div>
                    
                    <Form.Select className="" onChange={
                        (event: ChangeEvent<HTMLSelectElement>) => handleFilterChange(event, filterId)
                    }>
                        {RenderFilterOptions(selectedFilter.options)}
                    </Form.Select>
                </Col>
            )
        })
    }

    function handleFilterChange(event: ChangeEvent<HTMLSelectElement>, filterId:string) {
        let newSelectedFilters : FilterDict = Object.assign({}, selectedFilters);
        let filterToUpdate = filters[filterId];
        filterToUpdate.selectedOption = event.target.value
        newSelectedFilters[filterId] = filterToUpdate
        setSelectedFilters(newSelectedFilters);
    }

    function handleSelectFilter(filterId:string) {
        let newSelectedFilters : FilterDict = Object.assign({}, selectedFilters);
        let newFilter = filters[filterId];
        newSelectedFilters[filterId] = newFilter
        setSelectedFilters(newSelectedFilters);
    }

    function handleDeSelectFilter(filterId:string) {
        let newSelectedFilters : FilterDict = Object.assign({}, selectedFilters);
        delete newSelectedFilters[filterId];
        setSelectedFilters(newSelectedFilters);
    }

    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item onClick={() => onPageChange(number)} key={number} active={number === pageNum}>
            {number}
            </Pagination.Item>,
        );
    }

    let SelectedFilters = RenderSelectedFilters();
    const Filters = RenderFilters();

    return (
        <Container className="mt-5">
            <Row className="mb-5">
                <Col>
                    <h1 className="mb-4">Service Variants</h1>
                </Col>
                <Col>
                    <Link to="create" className="text-white float-end" style={{ textDecoration: 'none' }} >
                        <Button className="mb-5">Create Service Variant</Button>
                    </Link>
                </Col>
            </Row>

            <Row>
                <Col sm={10}>
                    <Row className="ps-2">
                        {SelectedFilters}
                    </Row>
                </Col>
                <Col sm={2}>
                    <Dropdown className="float-end mb-5">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Add Filters
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {Filters}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

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
            <Pagination>{items}</Pagination>
        </Container>
    )
}