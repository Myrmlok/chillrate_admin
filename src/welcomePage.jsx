import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #3b83f60e, #8a5cf610)',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header style={{
        backgroundColor: 'white',
        padding: '1.5rem 2rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <h1 style={{
          fontWeight: 700,
          fontSize: '1.7rem',
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          ChillRate
        </h1>
        
      </header>

      <section style={{
        textAlign: 'center',
        padding: '4rem 2rem 2rem',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#1e293b',
          marginBottom: '1rem'
        }}>
          Добро пожаловать в <span style={{ color: '#3b82f6' }}>ChillRate</span>
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#475569',
          marginBottom: '2rem'
        }}>
          Управляй командами, отслеживай расслабленность и повышай эффективность — всё в одном сервисе.
        </p>
        <Link to="/auth" style={{
          backgroundColor: '#6366f1',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '14px',
          fontWeight: 600,
          fontSize: '1rem',
          boxShadow: '0 5px 15px rgba(99, 102, 241, 0.3)',
          textDecoration: 'none',
          transition: 'background-color 0.25s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
        >
          Начать работу
        </Link>
      </section>

      <section style={{
        maxWidth: '1200px',
        margin: '3rem auto',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        {[
          ['📈', 'Прозрачная статистика', 'Следи за прогрессом и принимай решения на основе данных.'],
          ['🤝', 'Сотрудничество в команде', 'Объединяйся, делись достижениями и поддерживай мотивацию.'],
          ['⚡', 'Мгновенные подключения', 'QR-коды позволяют подключать участников в один клик.'],
          ['🌿', 'Расслабленность под контролем', 'Следи за состоянием участников.']
        ].map(([icon, title, desc], i) => (
          <div key={i} style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 24px rgba(149, 157, 165, 0.1)',
            border: '1px solid #f0f2f5',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
            <h3 style={{ color: '#1e293b', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>{desc}</p>
          </div>
        ))}
      </section>

      

      <footer style={{
        backgroundColor: '#f1f5f9',
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        color: '#64748b',
        fontSize: '0.9rem',
        marginTop: 'auto'
      }}>
        <p style={{
          marginBottom: '0.5rem',
          fontWeight: 500,
          color: '#1e293b'
        }}>
          ChillRate © {new Date().getFullYear()}
        </p>
        <p style={{ marginBottom: '0.25rem' }}>
          Сервис для командного роста и внутренней гармонии
        </p>
        <p>
          <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>О проекте</a> · <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Поддержка</a>
        </p>
      </footer>
    </div>
  );
};

export default WelcomePage;
