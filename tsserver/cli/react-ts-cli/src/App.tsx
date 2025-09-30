import './App.css';
import { useState } from "react";

function App() {

  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [submitSuccess, setSubmitSucsess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmiting(true);
    setSubmitSucsess(false);

    try {
      const responce = await fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({name, email, message}),
      });

      if (responce.ok) {
        setSubmitSucsess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Ошибка при отправке данных.')
      }
    } catch (err) {
      console.error(err);
      alert('К серверу не удалось подключиться');
    } finally {
      setIsSubmiting(false);
    }
  }


return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Форма обратной связи</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Имя:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Сообщение:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Отправка...' : 'Отправить'}
        </button>

        {submitSuccess && (
          <p style={{ color: 'green', marginTop: '1rem' }}>
            Данные успешно отправлены!
          </p>
        )}
      </form>

      <p style={{ marginTop: '2rem' }}>
        <a href="/admin">Перейти в админ-панель</a>
      </p>
    </div>
  );
}

export default App
