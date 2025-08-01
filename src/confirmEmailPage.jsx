import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmEmailPage = () => {
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
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
          <h1 style={{
            fontWeight: 700,
            fontSize: '1.75rem',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            lineHeight: '1.2'
          }}>
            <Link to={'/'} style={{ textDecoration: 'none' }}>ChillRate</Link>
          </h1>
        </div>
      </header>

      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem',
        textAlign: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2.5rem 2rem',
          borderRadius: '16px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 12px 32px rgba(149, 157, 165, 0.15)',
          border: '1px solid #f0f2f5'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              display: 'inline-block',
              backgroundColor: '#eef4ff',
              padding: '1rem',
              borderRadius: '50%',
              marginBottom: '1rem'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#1e293b',
              margin: '0.5rem 0'
            }}>
              Подтвердите почту
            </h2>
            <p style={{
              fontSize: '1rem',
              color: '#475569',
              marginBottom: '1.5rem'
            }}>
              На указанный адрес электронной почты отправлена ссылка для подтверждения. Проверьте почту и перейдите по ней, чтобы активировать аккаунт.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/auth" style={{
              backgroundColor: '#6366f1',
              color: 'white',
              padding: '0.9rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.25s ease'
            }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
            >
              Вернуться к входу
            </Link>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Если письмо не пришло, проверь папку "Спам" или запроси повторную отправку.
            </div>
          </div>
        </div>
      </section>

      <footer style={{
        backgroundColor: '#f1f5f9',
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        color: '#64748b',
        fontSize: '0.9rem'
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

export default ConfirmEmailPage;
