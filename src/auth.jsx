import React, { useState } from 'react';
import logo from './assets/logo.svg';
import Api from './Api'; 

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [working, setWorking] = useState(false);
  const [msg, setMsg] = useState(null);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setWorking(true);

    try {
      let result;

      if (isLogin) {
        result = await Api.auth(name, email, password);
      } else {
        result = await Api.register(name, email, password);
      }

      if (result?.error) {
        setMsg(`Ошибка: ${typeof result.error === 'string' ? result.error : JSON.stringify(result.error)}`);
      } else if (result?.token) {
        localStorage.setItem('jwt', result.token);
        Api.setToken(result.token)
        setMsg('Успешно!');
      } else {
        setMsg('нет токена. ' + JSON.stringify(result));
      }
    } catch (ex) {
      setMsg('ошибка запроса: ' + (ex.message || JSON.stringify(ex)));
    } finally {
      setWorking(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #3b83f60e, #8a5cf610)',
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
          <img src={logo} style={{ width: '400px', height: '200px' }} alt="logo" />
        </div>

        <h2 style={{ fontWeight: 600, marginBottom: '1.5rem', color: '#1e293b' }}>
          {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={e => setName(e.target.value)}
              style={inputStyle}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
            required
          />

          <button
            type="submit"
            style={{ ...buttonStyle, opacity: working ? 0.7 : 1, pointerEvents: working ? 'none' : 'auto' }}
            disabled={working}
          >
            {working ? (isLogin ? 'Вход...' : 'Регистрация...') : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        {msg && (
          <p style={{ marginTop: '1rem', color: msg.startsWith('Ошибка') ? '#b91c1c' : '#166534', fontSize: '0.9rem' }}>
            {msg}
          </p>
        )}

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
