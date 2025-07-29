// CoachHomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const CoachHomePage = () => {
  const teams = ['Команда A', 'Команда Б'];
  const totalUsers = 4;
  const avgRelax = 59;

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
      background: 'linear-gradient(to right, #3b83f60e, #8a5cf610)',
    }}>
      {/* Верхняя панель */}
      <header style={{
        backgroundColor: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          <h1 style={{ 
            fontWeight: 700, 
            fontSize: '1.5rem',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ChillRate
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            
            <div>
              <div style={{ fontWeight: 600, color: '#1e293b' }}>Иван Иванов</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Тренер</div>
            </div>
          </div>
          <button
            onClick={() => console.log("Открыть настройки")}
            style={{
              backgroundColor: '#f1f5f9',
              color: '#334155',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            ⚙ Настройки
          </button>
          <button
            onClick={() => console.log("Выход")}
            style={{
              backgroundColor: '#fee2e286',
              color: '#b91c1c',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
          Выйти
          </button>
        </div>
      </header>

      <main style={{
        flex: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        boxSizing: 'border-box'
      }}>
        <section style={{
          backgroundColor: 'white',
          padding: '1.75rem',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(149, 157, 165, 0.15)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          border: '1px solid #f0f2f5',
          ':hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 28px rgba(149, 157, 165, 0.2)'
          }
        }}>
          <h2 style={{
            marginBottom: '1.5rem',
            fontWeight: 600,
            fontSize: '1.5rem',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              display: 'inline-block',
              width: '6px',
              height: '24px',
              backgroundColor: '#3b82f6',
              borderRadius: '3px'
            }}></span>
            Мои команды
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {teams.map((team, index) => (
              <li key={index} style={{ marginBottom: '0.75rem' }}>
                <Link to={`/team/a`} style={{
                  display: 'block',
                  padding: '0.9rem 1.25rem',
                  backgroundColor: '#f8fafc',
                  color: '#1e40af',
                  fontWeight: 500,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  borderLeft: '3px solid #3b82f6',
                  ':hover': {
                    backgroundColor: '#eff6ff',
                    transform: 'translateX(4px)'
                  }
                }}>
                  {team}
                </Link>
              </li>
            ))}
            <li>
            <button
              onClick={() => console.log("Добавить команду")}
              style={{
                width: '100%',
                padding: '0.9rem 1.25rem',
                backgroundColor: '#036aa11f',
                color: '#0369a1',
                fontWeight: 500,
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                borderLeft: '3px solid #0ea5e9'
              }}
            >
              ➕ Добавить команду
            </button>
          </li>
          </ul>
        </section>

        <section style={{
          backgroundColor: 'white',
          padding: '1.75rem',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(149, 157, 165, 0.15)',
          border: '1px solid #f0f2f5'
        }}>
          <h2 style={{
            marginBottom: '1.5rem',
            fontWeight: 600,
            fontSize: '1.5rem',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              display: 'inline-block',
              width: '6px',
              height: '24px',
              backgroundColor: '#10b981',
              borderRadius: '3px'
            }}></span>
            Общая статистика
          </h2>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{
              backgroundColor: '#f0fdf9',
              padding: '1.25rem',
              borderRadius: '12px',
              flex: 1,
              minWidth: '150px'
            }}>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Участников</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f766e' }}>{totalUsers}</div>
            </div>
            
            <div style={{
              backgroundColor: '#f0f9ff',
              padding: '1.25rem',
              borderRadius: '12px',
              flex: 1,
              minWidth: '150px'
            }}>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Расслабленность</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0c4a6e' }}>{avgRelax}%</div>
            </div>
          </div>
          
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#e0f2fe',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 500, color: '#1e293b' }}>Стабильный прогресс</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>блаблаблаблабла</div>
            </div>
          </div>
        </section>

        <section style={{
          backgroundColor: 'white',
          padding: '1.75rem',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(149, 157, 165, 0.15)',
          border: '1px solid #f0f2f5',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{
            marginBottom: '1.5rem',
            fontWeight: 600,
            fontSize: '1.5rem',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{
              display: 'inline-block',
              width: '6px',
              height: '24px',
              backgroundColor: '#8b5cf6',
              borderRadius: '3px'
            }}></span>
            Приглашение в команду
          </h2>
          
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '1.5rem',
            backgroundColor: '#f5f3ff',
            borderRadius: '16px'
          }}>
            {/* <div style={{
              width: '180px',
              height: '180px',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '140px',
                height: '140px',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '4px'
              }}>
                {[...Array(25)].map((_, i) => (
                  <div key={i} style={{
                    backgroundColor: i % 4 === 0 ? '#8b5cf6' : '#ede9fe',
                    borderRadius: '3px'
                  }}></div>
                ))}
              </div>
            </div> */}
            <QRCodeSVG value="https://example.com" />

            <h3 style={{ fontWeight: 600, color: '#5b21b6', marginBottom: '0.5rem' }}>Сканируйте QR-код</h3>
            <p style={{ color: '#64748b', lineHeight: 1.5 }}>
              Отсканируйте код для присоединения к команде через мобильное устройство
            </p>
          </div>
          
          <button style={{
            marginTop: '1.5rem',
            padding: '0.9rem',
            backgroundColor: '#ede9fe',
            border: 'none',
            borderRadius: '12px',
            color: '#7c3aed',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            ':hover': {
              backgroundColor: '#ddd6fe'
            }
          }}>
            Поделиться QR-кодом
          </button>
        </section>

        
      </main>

      
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
              Сделано с заботой о командах и их прогрессе.
          </p>
          <p>
              <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Сайт компании "Нейротех"</a> · <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Информация о датчике</a>
          </p>
      </footer>

    </div>
  );
};

export default CoachHomePage;