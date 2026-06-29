import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormPage from './components/FormPage';
import CustomerFormFields from './forms/CustomerFormFields';
import TravelPlanFormFields from './forms/TravelPlanFormFields';
import HomePage from './pages/HomePage';
import TravelPlansPage from './pages/TravelPlansPage';
import ClientsPage from './pages/ClientsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/customer"
        element={
          <FormPage title="Cadastro Clientes">
            <CustomerFormFields />
          </FormPage>
        }
      />
      <Route
        path="/travel/:customerId?"
        element={
          <FormPage title="Cadastro de Viagens">
            <TravelPlanFormFields />
          </FormPage>
        }
      />
      <Route path="/travelView" element={<TravelPlansPage />} />
      <Route path="/clientView" element={<ClientsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

