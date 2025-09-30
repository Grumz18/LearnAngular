// src/Admin.tsx
import { useEffect, useState } from 'react';

type Submission = {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
};

function Admin() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/data');
        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Обновлять каждые 5 секунд (опционально)
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Админ-панель</h1>
      <p>Всего записей: {submissions.length}</p>

      {submissions.length === 0 ? (
        <p>Нет данных</p>
      ) : (
        <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Сообщение</th>
              <th>Время</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
                <td>{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p style={{ marginTop: '2rem' }}>
        <a href="/">← Вернуться к форме</a>
      </p>
    </div>
  );
}

export default Admin;