import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Services from './views/services';
import Landing from './views/landing';
import CreateService from './views/createService';
import Attributes from './views/attributes';
import CreateAttribute from './views/createAttribute';
import ServiceVariants from './views/serviceVariants';
import CreateServiceVariant from './views/createServiceVariant';
import ServiceLines from './views/serviceLines';
import ServiceAttributeValues from './views/serviceLineAttributes';
import CreateServiceAttributeValue from './views/createServiceAttributeValue';
import AttributeValues from './views/attributeValues';
import CreateAttributeValue from './views/createAttributeValue';
import CreateServiceAttributeLine from './views/createServiceLine';
import LoginForm from './views/loginForm';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <CookiesProvider>
      <App/>
    </CookiesProvider>
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/services/create" element={<CreateService/>}/>
      <Route path="/services/:serviceId" element={<ServiceLines/>}/>
      <Route path="/services/:serviceId/create" element={<CreateServiceAttributeLine/>}/>
      <Route path="/services/:serviceId/lines/:lineId" element={<ServiceAttributeValues/>}/>
      <Route path="/services/:serviceId/lines/:lineId/create" element={<CreateServiceAttributeValue/>}/>
      <Route path="/service_variants" element={<ServiceVariants/>}/>
      <Route path="/service_variants/create" element={<CreateServiceVariant/>}/>
      <Route path="/attributes" element={<Attributes/>}/>
      <Route path="/attributes/:attributeId" element={<AttributeValues/>}/>
      <Route path="/attributes/:attributeId/create" element={<CreateAttributeValue/>}/>
      <Route path="/attributes/create" element={<CreateAttribute/>}/>
      <Route path="/login" element={<LoginForm/>}/>
    </Routes>
  </BrowserRouter>
);