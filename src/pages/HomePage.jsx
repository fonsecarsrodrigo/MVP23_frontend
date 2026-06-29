import React from 'react';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import servicesImage from '../../images/bora_orneles_services.png';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <SiteHeader />

      <div className="service-image-card">
        <img src={servicesImage} alt="Bora Orneles Services" />
        <div className="service-image-card-text"></div>
      </div>

      <main className="site-body section-body">
        <h2>Cadastrar</h2>
        <div className="cards-grid">
          <article className="card clickable" onClick={() => navigate('/customer')}>
            <h3>Clientes</h3>
            <p>Registre novos clientes e mantenha seus dados organizados.</p>
          </article>
          <article className="card clickable" onClick={() => navigate('/travel')}>
            <h3>Planos de Viagens</h3>
            <p>Crie e gerencie planos de viagem para seus clientes.</p>
          </article>
        </div>
      </main>

      <main className="site-body section-body">
        <h2>Gerenciar</h2>
        <div className="cards-grid">
          <article className="card clickable" onClick={() => navigate('/clientView')}>
            <h3>Clientes</h3>
            <p>Acesse informações sobre clientes.</p>
          </article>
          <article className="card clickable" onClick={() => navigate('/travelView')}>
            <h3>Planos de Viagens</h3>
            <p>Acesse informações sobre planos de viagem.</p>
          </article>
        </div>
      </main>

      <footer className="site-footer">
        <p>© 2026  Bora Ornelës · Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default HomePage;
