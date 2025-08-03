import { useParams, Link } from 'react-router-dom';
import  { useState, useEffect, useRef } from  'react';
import Api from '../../../service/Api';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area
} from 'recharts';
import HeaderApp from '../../header/HeaderApp';

const users = [
  { email: '1', name: 'Стасян', relax: 75, updated: '17.04.2025, 10:23', team: 'Команда A' },
  { email: '2', name: 'Димас', relax: 50, updated: '17.04.2025, 10:19', team: 'Команда A' },
  { email: '3', name: 'Артем', relax: 20, updated: '17.04.2025, 10:19', team: 'Команда Б' },
  { email: '4', name: 'Пашок', relax: 90, updated: '17.04.2025, 10:19', team: 'Команда Б' },
  { email: 'komarovdima753@mail.ru', name: 'Дима', team: 'DimaTeam'},
];



const UserDetailPage = () => {
  const { teamId, email } = useParams();
  const user = users.find(u => u.email === email);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentAnxiety, setCurrentAnxiety] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        
        const response = await Api.getUserData(teamId, email, token);
        
        if (!response || !Array.isArray(response)) {
          throw new Error('Некорректный формат данных');
        }

        const formattedData = response.map(item => {
          try {
            const anxietyData = JSON.parse(item.data);
            const date = new Date(item.dateTime);
            return {
              time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              date: date.toLocaleDateString(),
              anxiety: anxietyData.percentageAnxiety,
              fullDate: date
            };
          } catch (e) {
            console.error('Ошибка парсинга данных:', e);
            return null;
          }
        }).filter(item => item !== null)
          .sort((a, b) => a.fullDate - b.fullDate);

        if (formattedData.length > 0) {
          setCurrentAnxiety(formattedData[formattedData.length - 1].anxiety);
          setLastUpdate(formattedData[formattedData.length - 1].fullDate);
        }

        setChartData(formattedData);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message || 'Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const intervalId = setInterval(fetchUserData, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [email]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '300px',
        color: '#64748b'
      }}>
        Загрузка данных...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #3b83f60e, #8a5cf610)',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: "'Inter', sans-serif",
      }}>
        <h2 style={{
          fontSize: '1.75rem',
          marginBottom: '1.5rem',
          color: '#1e293b',
          fontWeight: 600
        }}>Пользователь не найден</h2>
        <Link to="/main" style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          background: '#f1f5f9',
          color: '#3b82f6',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 500,
          transition: 'all 0.3s ease'
        }}>← Вернуться назад</Link>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(to right, #3b83f60e, #8a5cf610)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
     <HeaderApp></HeaderApp>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '2rem',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* User Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            {user.name.charAt(0)}
          </div>
          
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 700,
              margin: 0,
              color: '#1e293b'
            }}>{user.name}</h1>
            
            <p style={{
              color: '#64748b',
              marginTop: '0.5rem',
              fontSize: '1rem'
            }}>Участник команды {user.team}</p>
            
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '1rem',
              flexWrap: 'wrap'
            }}>
              
            </div>
          </div>
        </div>

        {/* Chart Section
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3V17H21V3H3ZM19 15H5V5H19V15Z" fill="#3b82f6"/>
              <path d="M13 7H15V13H13V7ZM9 9H11V13H9V9ZM17 9H19V13H17V9ZM3 19H21V21H3V19Z" fill="#3b82f6"/>
            </svg>
            Динамика расслабленности
          </h2>
          
          <div style={{ height: '300px', marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData}>
                <defs>
                  <linearGradient id="colorRelax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="relax" 
                  stroke="#3b82f6" 
                  fill="url(#colorRelax)" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="relax" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div> */}

        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>

      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '20px',
        flexWrap: 'wrap' 
      }}>
        <div style={{
          background: '#fff',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          minWidth: '200px'
        }}>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Текущий уровень</div>
          <div style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold',
            color: currentAnxiety > 70 ? '#10b981' : currentAnxiety > 40 ? '#f59e0b' : '#ef4444'
          }}>
            {currentAnxiety !== null ? `${currentAnxiety}%` : 'Н/Д'}
          </div>
        </div>
        
        <div style={{
          background: '#fff',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          minWidth: '200px'
        }}>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Последнее обновление</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>
            {lastUpdate ? lastUpdate.toLocaleString() : 'Н/Д'}
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#fff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        height: '400px'
      }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: '#64748b' }}
                label={{ 
                  value: 'Время', 
                  position: 'insideBottomRight', 
                  offset: -10,
                  fill: '#64748b'
                }}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fill: '#64748b' }}
                label={{ 
                  value: 'Расслабленность (%)', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: '#64748b'
                }}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Уровень расслабленности']}
                labelFormatter={(label) => `Время: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="anxiety" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#64748b'
          }}>
            Нет данных для отображения
          </div>
        )}
      </div>
    </div>

        {/* Back Button */}
        <div style={{ textAlign: 'center' }}>
          <Link 
            to={`/team/${teamId}`} 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
            }}
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
              }}
            >
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Назад к команде
          </Link>
        </div>
      </main>
    </div>
  );
};

export default UserDetailPage;