import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const users = [
  { id: '1', name: 'Стасян', relax: 75, updated: '2025-04-17T10:23:00', team: 'Команда A' },
  { id: '2', name: 'Димас', relax: 50, updated: '2025-04-17T10:19:00', team: 'Команда A' },
  { id: '3', name: 'Артем', relax: 20, updated: '2025-04-18T10:19:00', team: 'Команда Б' },
  { id: '4', name: 'Пашок', relax: 90, updated: '2025-04-17T10:19:00', team: 'Команда Б' }
];  

const getBarColor = (percent) => {
  if (percent >= 75) return '#10b981';
  if (percent >= 40) return '#f59e0b';
  return '#ef4444';
};

const UserCard = ({ user }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    marginBottom: '1rem',
    fontFamily: "'Inter', sans-serif",
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem'
    }}>
      <div>
        <span>{user.name}</span>
        <span style={{
          display: 'block',
          fontSize: '0.75rem',
          color: '#64748b',
          marginTop: '0.25rem'
        }}>{user.team}</span>
      </div>
      <span>{user.updated}</span>
    </div>
    <div style={{
      backgroundColor: '#f3f4f6',
      borderRadius: '4px',
      overflow: 'hidden',
      height: '1rem',
      width: '100%',
      marginTop: '0.5rem'
    }}>
      <div style={{
        height: '100%',
        backgroundColor: getBarColor(user.relax),
        textAlign: 'right',
        paddingRight: '0.5rem',
        lineHeight: '1rem',
        color: 'white',
        whiteSpace: 'nowrap',
        fontSize: '0.75rem',
        width: `${user.relax}%`
      }}>
        {user.relax}%
      </div>
    </div>
    <Link to={`/user/${user.id}`} style={{
      textDecoration: 'none',
      color: '#3b82f6',
      fontWeight: 'bold',
      transition: 'color 0.3s',
      display: 'block',
      marginTop: '0.5rem'
    }}>Открыть</Link>
  </div>
);

const UserTableRow = ({ user }) => {
  const date = new Date(user.updated);

  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedTime = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <tr style={{ borderBottom: '1px solid #d1d5db' }}>
      <td style={{ fontSize: '1.1rem', padding: '1rem' }}>{user.name}</td>
      <td style={{ fontSize: '1.1rem', padding: '1rem' }}>{user.team}</td>
      <td style={{ fontSize: '1.1rem', padding: '1rem' }}>
        <div style={{
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          overflow: 'hidden',
          height: '1rem',
          width: '100%'
        }}>
          <div style={{
            height: '100%',
            backgroundColor: getBarColor(user.relax),
            textAlign: 'right',
            paddingRight: '0.5rem',
            lineHeight: '1rem',
            color: 'white',
            whiteSpace: 'nowrap',
            fontSize: '1rem',
            width: `${user.relax}%`
          }}>
            {user.relax}%
          </div>
        </div>
      </td>
      <td style={{ padding: '1rem' }}>
        {formattedDate}, {formattedTime}
      </td>
      <td style={{ padding: '1rem' }}>
        <Link to={`/user/${user.id}`} style={{
          textDecoration: 'none',
          color: '#3b82f6',
          fontWeight: 'bold',
          transition: 'color 0.3s'
        }}>Открыть</Link>
      </td>
    </tr>
  );
};


const UserTable = ({ users }) => (
  <div style={{
    overflowX: 'auto',
    marginBottom: '1.5rem',
    boxShadow: '0px 0px 100px #3b83f628'
  }}>
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      minWidth: '650px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
    }}>
      <thead style={{ 
        backgroundColor: '#3b82f6',
        color: 'white'
      }}>
        <tr>
          <th style={{ padding: '1rem', textAlign: 'left' }}>Участник</th>
          <th style={{ padding: '1rem', textAlign: 'left' }}>Команда</th>
          <th style={{ padding: '1rem', textAlign: 'left' }}>Расслабленность</th>
          <th style={{ padding: '1rem', textAlign: 'left' }}>Последнее обновление</th>
          <th style={{ padding: '1rem', textAlign: 'left' }}>Детали</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <UserTableRow key={index} user={user} />
        ))}
      </tbody>
    </table>
  </div>
);

const CoachDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [avgRelax, setAvgRelax] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [sortBy, setSortBy] = useState('updated'); //  'relax'
  const requests = [
    { id: '10', name: 'Алина', relax: 60, updated: '17.04.2025, 10:45' },
    { id: '11', name: 'Кирилл', relax: 30, updated: '17.04.2025, 10:50' },
  ]
  const [joinRequests, setJoinRequests] = useState(requests);
  const [showRequests, setShowRequests] = useState(false);

  const handleAccept = (req) => {
    setJoinRequests((prev) => prev.filter(r => r.id !== req.id));
  };

  const handleReject = (req) => {
    setJoinRequests((prev) => prev.filter(r => r.id !== req.id));
  };


  useEffect(() => {
    let filtered = users.filter(u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'relaxMax') {
      filtered = filtered.sort((a, b) => b.relax - a.relax);
    } else if (sortBy === 'updatedMax') {
      filtered = filtered.sort((a, b) =>
        new Date(b.updated) - new Date(a.updated)
      );
    } else if (sortBy === 'relaxMin') {
      filtered = filtered.sort((a, b) => a.relax - b.relax);
    } else if (sortBy === 'updatedMin') {
      filtered = filtered.sort((a, b) =>
        new Date(a.updated) - new Date(b.updated)
      );
    }

    const sum = filtered.reduce((acc, user) => acc + user.relax, 0);
    const average = filtered.length ? (sum / filtered.length).toFixed(0) : 0;

    setFilteredUsers(filtered);
    setAvgRelax(average);
    setTotalUsers(filtered.length);
  }, [searchQuery, sortBy]);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        alignItems: 'center'
      }}>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск участника..."
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              backgroundColor: '#fffffff',
              fontSize: '1rem'
            }}
          />
        </div>
        <button 
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background-color 0.3s'
          }}
        >
          Обновить
        </button>
        <button
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
          }}
        >
          ⚙️ Настройки команды
        </button>
      </div>

      <div style={{
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ 
          fontSize: '1.4rem',
          fontWeight: '600',
          color: '#1e293b'
        }}>
          Средняя расслабленность: <span style={{ color: '#3b82f6', fontWeight: '700' }}>{avgRelax}%</span>
        </div>
        <div>Участников: <span style={{ color: '#3b82f6', fontWeight: '700' }}>{totalUsers}</span></div>
      </div>
      
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{
          padding: '0.5rem',
          borderRadius: '8px',
          border: '1px solid #d1d5db',
          backgroundColor: 'white',
          fontSize: '1rem',
          marginBottom: '10px'
        }}
      >
        <option value="updatedMax">Сортировка: По дате (убывание) </option>
        <option value="updatedMin">Сортировка: По дате (возрастание) </option>
        <option value="relaxMax">Сортировка: По расслабленности (убывание)</option>
        <option value="relaxMin">Сортировка: По расслабленности (возрастание)</option>
      </select>


      <UserTable users={filteredUsers} />

      <div style={{
        display: 'none',
        gridTemplateColumns: '1fr',
        gap: '1rem'
      }}>
        {filteredUsers.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
      <button
        onClick={() => setShowRequests(!showRequests)}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 700
        }}
      >
        {showRequests ? 'Скрыть заявки' : 'Показать заявки'}
      </button>

      {showRequests && joinRequests.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ 
            marginBottom: '1.5rem',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#3b82f6"/>
              <path d="M12 14C7.58172 14 4 15.7909 4 18V20H20V18C20 15.7909 16.4183 14 12 14Z" fill="#3b82f6"/>
            </svg>
            Заявки на вступление
          </h2>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.25rem',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {joinRequests.map((req) => (
              <div key={req.id} style={{
                backgroundColor: 'white',
                padding: '1.25rem 1.5rem',
                border: 'thick double #32a2ce46',
                borderRadius: '12px',
                boxShadow: '0 0px 15px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                }
              }}>
                <div style={{ display: 'flex', flexDirection: 'column',  }}>
                  <strong style={{ 
                    fontSize: '1.1rem',
                    color: '#111827',
                    marginBottom: '0.25rem'
                  }}>{req.name}</strong>
                  <span style={{ 
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>{req.updated}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => handleAccept(req)} style={{
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1.2rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    ':hover': {
                      background: '#059669',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                    }
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Принять
                  </button>

                  <button onClick={() => handleReject(req)} style={{
                    background: 'transparent',
                    color: '#ef4444',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    padding: '0.6rem 1.2rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    ':hover': {
                      background: '#fee2e2',
                      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2)'
                    }
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Отклонить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardLayout = () => (
  <div style={{
    minHeight: '100vh',
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
        <div style={{
          fontSize: '0.9rem',
          color: '#94a3b8',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Команда A
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
    <main style={{ 
      padding: '2rem',
      flex: 1,
      background: 'linear-gradient(to right, #3b83f60e, #8a5cf610)',
    }}>
      <CoachDashboard />
    </main>
  </div>
);

export default DashboardLayout;