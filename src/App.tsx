import React from 'react';
import { BrowserRouter, Link, RouteObject, Routes, useRoutes } from 'react-router-dom';
import './App.css';
import NavBarComponent from './components/navbar';
import Attributes from './views/attributes';
import AttributeValues from './views/attributeValues';
import CreateAttribute from './views/createAttribute';
import CreateAttributeValue from './views/createAttributeValue';
import CreateService from './views/createService';
import CreateServiceAttributeValue from './views/createServiceAttributeValue';
import CreateServiceAttributeLine from './views/createServiceLine';
import CreateServiceVariant from './views/createServiceVariant';
import Landing from './views/landing';
import LoginForm from './views/loginForm';
import ServiceAttributeValues from './views/serviceLineAttributes';
import ServiceLines from './views/serviceLines';
import Services from './views/services';
import ServiceVariants from './views/serviceVariants';
import { Cookies, withCookies } from 'react-cookie';
import CreateFeeScheduleApiClient from './components/feeScheduleApi';
import { DefaultApi } from './components/api';
import UpdateService from './views/updateService';
import UpdateAttribute from './views/updateAttribute';
import UpdateAttributeValue from './views/updateAttributeValue';
import useBreadcrumbs, {Route, createRoutesFromChildren} from 'use-react-router-breadcrumbs';
import { Breadcrumb } from 'react-bootstrap';

interface AppProps {
  cookies: Cookies;
}

function App(props:AppProps) {
  //const breadcrumbs = useBreadcrumbs();
  const sessionToken = props.cookies.get('sessionToken')
  const userId = props.cookies.get('userId')
  const [feeScheduleApi, setFeeScheduleApi] = React.useState(CreateFeeScheduleApiClient({
    sessionToken: sessionToken,
    userId: userId
  }))
  const [currentServiceName, setCurrentServiceName] = React.useState("");
  const [currentServiceAttrName, setCurrentServiceAttrName] = React.useState("");
  const [currentAttrName, setCurrentAttrName] = React.useState("");
  const [currentAttrValName, setCurrentAttrValName] = React.useState("");

  const GenerateAppRoutes = () => {
    return (
      <>
        <Route path="/" element={<Landing />}/>
        <Route path="/services" element={<Services feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/services/create" element={<CreateService feeScheduleApi={feeScheduleApi}/>}/>
        <Route 
          path="/services/:serviceId"
          element={<ServiceLines feeScheduleApi={feeScheduleApi}
          setCurrentServiceName={setCurrentServiceName}/>}
          breadcrumb={currentServiceName}
        />
        <Route path="/services/:serviceId/update" element={<UpdateService feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/services/:serviceId/create" element={<CreateServiceAttributeLine feeScheduleApi={feeScheduleApi}/>}/>
        <Route 
          path="/services/:serviceId/lines/:lineId"
          element={<ServiceAttributeValues
          setCurrentServiceAttrName={setCurrentServiceAttrName}
          feeScheduleApi={feeScheduleApi}/>}
          breadcrumb={currentServiceAttrName}
        />
        <Route path="/services/:serviceId/lines/:lineId/create" element={<CreateServiceAttributeValue feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/service_variants" element={<ServiceVariants feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/service_variants/create" element={<CreateServiceVariant feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/attributes" element={<Attributes feeScheduleApi={feeScheduleApi}/>}/>
        <Route 
          path="/attributes/:attributeId"
          element={
            <AttributeValues
              feeScheduleApi={feeScheduleApi}
              setCurrentAttrName={setCurrentAttrName}
            />
          }
          breadcrumb={currentAttrName}
        />
        <Route 
          path="/attributes/:attributeId/values/:attributeValueId"
          element={
            <UpdateAttributeValue 
              feeScheduleApi={feeScheduleApi}
              setCurrentAttrValName={setCurrentAttrValName}
            />
          }
          breadcrumb={currentAttrValName}
        />
        <Route path="/attributes/:attributeId/create" element={<CreateAttributeValue feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/attributes/:attributeId/update" element={<UpdateAttribute feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/attributes/create" element={<CreateAttribute feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/login" element={<LoginForm cookies={props.cookies} feeScheduleApi={feeScheduleApi} setFeeScheduleApi={setFeeScheduleApi}/>}/>
      </>
    )
  }

  const AppRoutes = GenerateAppRoutes();
  const appRouteObjects = createRoutesFromChildren(AppRoutes);
  const breadCrumbs = useBreadcrumbs(appRouteObjects)
  const GeneratedRoutes = useRoutes(appRouteObjects);
  return (
    <>
      <NavBarComponent/>
      <Breadcrumb>
        {breadCrumbs.map(({
            match,
            breadcrumb
          }) => (
            <Breadcrumb.Item key={match.pathname}>
              <Link to={match.pathname}>
                {breadcrumb}</Link>
            </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      {GeneratedRoutes}
  </>
  );
}

export default withCookies(App);
