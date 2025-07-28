import React, { useState } from 'react';
import logo from './assets/logo.svg';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => setIsLogin(!isLogin);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '3rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{ color: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', textAlign: 'center' }}>
          <img src={logo} style={{ width: '400px', height: '200px', color: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />
        </div>

        <h2 style={{ fontWeight: 600, marginBottom: '1.5rem', color: '#1e293b' }}>
          {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
        </h2>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Имя"
              style={inputStyle}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Пароль"
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
          {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <span onClick={toggleAuth} style={{
            color: '#3b82f6',
            cursor: 'pointer',
            fontWeight: 500
          }}>
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </span>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '0.8rem 1rem',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  outline: 'none',
  fontSize: '0.95rem',
  backgroundColor: '#f9fafb',
  transition: 'border-color 0.2s ease',
};

const buttonStyle = {
  backgroundColor: '#6366f1',
  color: '#fff',
  border: 'none',
  padding: '0.9rem',
  borderRadius: '12px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease'
};

export default AuthPage;
