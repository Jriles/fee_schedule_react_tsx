import React from 'react';
import ReactDOM from 'react-dom/client';
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


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <App/>
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/services/create" element={<CreateService/>}/>
    </Routes>
  </BrowserRouter>
);