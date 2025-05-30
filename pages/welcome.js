import { useEffect, useState } from 'react';

export default function Welcome() {
  const [response, setResponse] = useState('⏳ Starting...');
  const [error, setError] = useState('');

  useEffect(() => {
    const runConcierge = async () => {
      try {
        const res = await fetch('https://thriveomate.com/api/concierge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt: '🧠 Welcome the new user and ask how you can assist!'
          })
        });

        const data = await res.json();
        if (data.reply) {
          setResponse(data.reply);
        } else {
          setError('❌ ConciergeBot did not return a response.');
        }
      } catch (err) {
        console.error('ConciergeBot error:', err);
        setError('❌ Failed to reach ConciergeBot.');
      }
    };

    runConcierge();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>👋 Welcome to Thriveomate</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{response}</p>
      )}
    </div>
  );
}