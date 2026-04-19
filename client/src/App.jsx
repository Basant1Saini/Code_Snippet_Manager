import { useState, useEffect, useCallback } from 'react';
import { api } from './api/snippets.js';
import AuthForm from './components/AuthForm.jsx';
import SnippetCard from './components/SnippetCard.jsx';
import SnippetForm from './components/SnippetForm.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState('');

  const loadSnippets = useCallback(async () => {
    const data = search ? await api.searchSnippets(search) : await api.getSnippets();
    setSnippets(data);
  }, [search]);

  useEffect(() => {
    if (user) loadSnippets();
  }, [user, loadSnippets]);

  async function handleCreate(body) {
    await api.createSnippet(body);
    loadSnippets();
  }

  async function handleDelete(id) {
    await api.deleteSnippet(id);
    setSnippets((s) => s.filter((x) => x.id !== id));
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    setSnippets([]);
  }

  if (!user) return <AuthForm onAuth={setUser} />;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Code Snippet Manager</h1>
        <div>
          <span style={{ marginRight: 12, color: '#666' }}>{user.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <SnippetForm onSubmit={handleCreate} />

      <input
        placeholder="Search snippets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 16, boxSizing: 'border-box' }}
      />

      {snippets.length === 0 ? (
        <p style={{ color: '#999', textAlign: 'center' }}>No snippets yet. Add one above!</p>
      ) : (
        snippets.map((s) => <SnippetCard key={s.id} snippet={s} onDelete={handleDelete} />)
      )}
    </div>
  );
}
