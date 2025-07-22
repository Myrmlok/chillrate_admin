import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const users = [
  { id: '1', name: 'Стасян', relax: 75, updated: '17.04.2025, 10:23', team: 'Команда A' },
  { id: '2', name: 'Димас', relax: 50, updated: '17.04.2025, 10:19', team: 'Команда A' },
  { id: '3', name: 'Артем', relax: 20, updated: '17.04.2025, 10:19', team: 'Команда Б' },
  { id: '4', name: 'Пашок', relax: 90, updated: '17.04.2025, 10:19', team: 'Команда Б' }
];

const styles = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f9fafb;
    color: #111827;
    line-height: 1.5;
  }
  a {
    text-decoration: none;
    color: #3b82f6;
    font-weight: bold;
    transition: color 0.3s;
  }
  a:hover {
    color: #1e3a8a;
  }
  .dashboard-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  main { 
    padding: 2rem; 
    flex: 1;
  }
  .coach-dashboard {
    max-width: 1200px;
    margin: 0 auto;
  }
  .controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: center;
  }
  .search-bar input {
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background-color: white;
    font-size: 1rem;
  }
  .refresh-btn {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  .refresh-btn:hover {
    background-color: #1e40af;
  }
  .summary {
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .summary .stat { 
    font-size: 1.4rem; 
    font-weight: 600;
    color: #1e293b;
  }
  .summary span {
    color: #3b82f6;
    font-weight: 700;
  }
  .table-wrapper { 
    overflow-x: auto; 
  }
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    min-width: 650px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  }
  thead { 
    background-color: #3b82f6; 
    color: white; 
  }
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #d1d5db;
  }
  tbody tr:hover { 
    background-color: #f1f5f9;
    cursor: pointer;
  }
  .progress {
    background-color: #f3f4f6;
    border-radius: 4px;
    overflow: hidden;
    height: 1rem;
    width: 100%;
  }
  .progress-bar {
    height: 100%;
    background-color: #3b82f6;
    text-align: right;
    padding-right: 0.5rem;
    line-height: 1rem;
    color: white;
    white-space: nowrap;
    font-size: 0.75rem;
  }
  .cards { 
    display: none; 
  }
  @media (max-width: 600px) {
    .table-wrapper { 
      display: none; 
    }
    .cards {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .card {
      background-color: white;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.07);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .card .team-label {
      display: block;
      font-size: 0.75rem;
      color: #64748b;
      margin-top: 0.25rem;
    }
    .card .progress { 
      margin-top: 0.5rem; 
    }
  }
`;

const UserCard = ({ user }) => (
  <div className="card">
    <div className="card-header">
      <div>
        <span>{user.name}</span>
        <span className="team-label">{user.team}</span>
      </div>
      <span>{user.updated}</span>
    </div>
    <div className="progress">
      <div className="progress-bar" style={{ width: `${user.relax}%` }}>
        {user.relax}%
      </div>
    </div>
    <td><Link to={`/user/${user.id}`}>Открыть</Link></td>
  </div>
);

const UserTableRow = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.team}</td>
    <td>
      <div className="progress">
        <div className="progress-bar" style={{ width: `${user.relax}%` }}>
          {user.relax}%
        </div>
      </div>
    </td>
    <td>{user.updated}</td>
    <td><Link to={`/user/${user.id}`}>Открыть</Link></td>
  </tr>
);

const UserTable = ({ users }) => (
  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Участник</th>
          <th>Команда</th>
          <th>Расслабленность</th>
          <th>Последнее обновление</th>
          <th>Детали</th>
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

    const sum = filtered.reduce((acc, user) => acc + user.relax, 0);
    const average = filtered.length ? (sum / filtered.length).toFixed(0) : 0;

    setFilteredUsers(filtered);
    setAvgRelax(average);
    setTotalUsers(filtered.length);
  }, [searchQuery]);

  return (
    <div className="coach-dashboard">
      <div className="controls">
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск участника..."
          />
        </div>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          Обновить
        </button>
      </div>

      <div className="summary">
        <div className="stat">
          Средняя расслабленность: <span id="avgRelax">{avgRelax}%</span>
        </div>
        <div>Участников: <span id="totalUsers">{totalUsers}</span></div>
      </div>

      <UserTable users={filteredUsers} />

      <div className="cards">
        {filteredUsers.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

const DashboardLayout = () => (
  <div className="dashboard-layout">
    <style>{styles}</style>
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
    <main>
      <CoachDashboard />
    </main>
  </div>
);

export default DashboardLayout;
