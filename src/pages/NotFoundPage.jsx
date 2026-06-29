import React from 'react';
import SiteHeader from '../components/SiteHeader';
import BackButton from '../components/BackButton';

function NotFoundPage() {
  return (
    <div className="app-container">
      <SiteHeader />

      <main className="site-body customer-form-page">
        <div className="page-title-row">
          <div className="page-title-cell" />
          <div className="page-title-cell page-title-center">
            <h1>404 - Página não encontrada</h1>
          </div>
          <div className="page-title-cell" />
        </div>

        <div className="not-found-content">
          <p>A página que você tentou acessar não existe.</p>
          <BackButton />
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
