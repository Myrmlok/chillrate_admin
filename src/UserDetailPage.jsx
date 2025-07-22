import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

const users = [
  { id: '1', name: 'Стасян', relax: 75, updated: '17.04.2025, 10:23', team: 'Команда A' },
  { id: '2', name: 'Димас', relax: 50, updated: '17.04.2025, 10:19', team: 'Команда A' },
  { id: '3', name: 'Артем', relax: 20, updated: '17.04.2025, 10:19', team: 'Команда Б' },
  { id: '4', name: 'Пашок', relax: 90, updated: '17.04.2025, 10:19', team: 'Команда Б' }
];

const UserDetailPage = () => {
  const { userId } = useParams();
  const user = users.find(u => u.id === userId);

  const sampleData = [
    { time: '10:00', relax: 70 },
    { time: '10:05', relax: 72 },
    { time: '10:10', relax: 68 },
    { time: '10:15', relax: 75 },
    { time: '10:20', relax: 73 },
    { time: '10:25', relax: 78 }
  ];

  if (!user) {
    return (
      <div style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'sans-serif'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Пользователь не найден</h2>
        <Link to="/" style={{ color: '#2563eb', textDecoration: 'none' }}>← Вернуться назад</Link>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{
        fontSize: '1.75rem',
        fontWeight: '600',
        marginBottom: '1.5rem'
      }}>{user.name}</h1>

      <div style={{
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}>
        <p style={{ marginBottom: '0.5rem' }}><strong>Команда:</strong> {user.team}</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Расслабленность:</strong> {user.relax}%</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Последнее обновление:</strong> {user.updated}</p>
      </div>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Динамика расслабленности</h2>

      <div style={{
        background: '#f9fafb',
        borderRadius: '1rem',
        padding: '1rem',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
        marginBottom: '2rem'
      }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Area type="monotone" dataKey="relax" stroke="#3b82f6" fill="#bfdbfe" />
            <Line type="monotone" dataKey="relax" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link
          to="/team/a"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          ← Назад к участникам
        </Link>
      </div>
    </div>
  );
};

export default UserDetailPage;
