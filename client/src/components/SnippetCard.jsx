import { useState } from 'react';

export default function SnippetCard({ snippet, onDelete }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>{snippet.title}</h3>
        <span style={{ fontSize: 12, background: '#eee', padding: '2px 8px', borderRadius: 4 }}>
          {snippet.language}
        </span>
      </div>
      {snippet.description && <p style={{ color: '#666', margin: '8px 0' }}>{snippet.description}</p>}
      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: 12, borderRadius: 6, overflow: 'auto' }}>
        <code>{snippet.code}</code>
      </pre>
      {snippet.tags?.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {snippet.tags.map((tag) => (
            <span key={tag} style={{ marginRight: 6, background: '#dbeafe', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <button onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button>
        <button onClick={() => onDelete(snippet.id)} style={{ color: 'red' }}>Delete</button>
      </div>
    </div>
  );
}
