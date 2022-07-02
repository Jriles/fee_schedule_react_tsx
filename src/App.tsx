import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

interface AppProps {
  cookies: Cookies;
}

function App(props:AppProps) {
  const sessionToken = props.cookies.get('sessionToken')
  const userId = props.cookies.get('userId')
  const [feeScheduleApi, setFeeScheduleApi] = React.useState(CreateFeeScheduleApiClient({
    sessionToken: sessionToken,
    userId: userId
  }))

  return (
    <BrowserRouter>
      <NavBarComponent/>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/services" element={<Services feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/services/create" element={<CreateService feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/services/:serviceId" element={<ServiceLines feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/services/:serviceId/create" element={<CreateServiceAttributeLine feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/services/:serviceId/lines/:lineId" element={<ServiceAttributeValues feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/services/:serviceId/lines/:lineId/create" element={<CreateServiceAttributeValue feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/service_variants" element={<ServiceVariants feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/service_variants/create" element={<CreateServiceVariant feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/attributes" element={<Attributes feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/attributes/:attributeId" element={<AttributeValues feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/attributes/:attributeId/create" element={<CreateAttributeValue feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/attributes/create" element={<CreateAttribute feeScheduleApi={feeScheduleApi}/>}/>
        <Route path="/login" element={<LoginForm cookies={props.cookies} feeScheduleApi={feeScheduleApi} setFeeScheduleApi={setFeeScheduleApi}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default withCookies(App);
