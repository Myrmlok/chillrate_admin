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
    marginBottom: '1rem'
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

  useEffect(() => {
    const filtered = users.filter(u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));

    const sum = filtered.reduce((acc, user) => acc + user.relax, 0);
    const average = filtered.length ? (sum / filtered.length).toFixed(0) : 0;

    setFilteredUsers(filtered);
    setAvgRelax(average);
    setTotalUsers(filtered.length);
  }, [searchQuery]);

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
              backgroundColor: 'white',
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
          <Link to={'/'} style={{ textDecoration: 'none' }}>ChillRate</Link>
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
      flex: 1
    }}>
      <CoachDashboard />
    </main>
  </div>
);

export default DashboardLayout;