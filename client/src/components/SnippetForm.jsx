import { useState } from 'react';

const LANGUAGES = ['javascript', 'python', 'typescript', 'java', 'go', 'rust', 'bash', 'sql', 'other'];

export default function SnippetForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', description: '', code: '', language: 'javascript', tags: '' });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) });
    setForm({ title: '', description: '', code: '', language: 'javascript', tags: '' });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
      <input name="title" placeholder="Title *" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <select name="language" value={form.language} onChange={handleChange}>
        {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
      </select>
      <textarea name="code" placeholder="Code *" value={form.code} onChange={handleChange} rows={6} required />
      <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
      <button type="submit">Add Snippet</button>
    </form>
  );
}
