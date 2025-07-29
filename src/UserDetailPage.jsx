import { useParams, Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area
} from 'recharts';

const users = [
  { id: '1', name: 'Стасян', relax: 75, updated: '17.04.2025, 10:23', team: 'Команда A' },
  { id: '2', name: 'Димас', relax: 50, updated: '17.04.2025, 10:19', team: 'Команда A' },
  { id: '3', name: 'Артем', relax: 20, updated: '17.04.2025, 10:19', team: 'Команда Б' },
  { id: '4', name: 'Пашок', relax: 90, updated: '17.04.2025, 10:19', team: 'Команда Б' }
];

const sampleData = [
  { time: '10:00', relax: 70 },
  { time: '10:05', relax: 72 },
  { time: '10:10', relax: 68 },
  { time: '10:15', relax: 75 },
  { time: '10:20', relax: 73 },
  { time: '10:25', relax: 78 }
];

const UserDetailPage = () => {
  const { userId } = useParams();
  const user = users.find(u => u.id === userId);

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
        textAlign: 'center'
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
          <div style={{
            fontSize: '0.9rem',
            color: '#94a3b8',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {user.team}
          </div>
          <h1 style={{
            fontWeight: 700,
            fontSize: '1.75rem',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            lineHeight: '1.2'
          }}>
            <Link to={'/main'} style={{ textDecoration: 'none' }}>ChillRate</Link>
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#1e293b' }}>Иван Иванов</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Тренер</div>
            </div>
          </div>
        </div>
      </header>

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
              <div style={{
                background: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                minWidth: '180px'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Текущий уровень</div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#3b82f6'
                }}>{user.relax}%</div>
              </div>
              
              <div style={{
                background: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                minWidth: '180px'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Последнее обновление</div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#1e293b'
                }}>{user.updated}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
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
        </div>

        {/* Back Button */}
        <div style={{ textAlign: 'center' }}>
          <Link 
            to={`/team/${user.team.toLowerCase().replace(' ', '-')}`} 
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