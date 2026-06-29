import React from 'react';
import SiteHeader from './SiteHeader';
import BackButton from './BackButton';

function FormPage({ title, children }) {
  return (
    <div className="app-container">
      <SiteHeader />

      <main className="site-body customer-form-page">
        <div className="page-title-row">
          <div className="page-title-cell">
            <BackButton />
          </div>
          <div className="page-title-cell page-title-center">
            <h1>{title}</h1>
          </div>
          <div className="page-title-cell" />
        </div>

        {children}
      </main>
    </div>
  );
}

export default FormPage;
