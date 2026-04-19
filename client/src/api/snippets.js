const BASE = '/api';

function headers() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, { ...options, headers: headers() });
  if (!res.ok) throw await res.json();
  return res.status === 204 ? null : res.json();
}

export const api = {
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  getSnippets: () => request('/snippets'),
  getSnippet: (id) => request(`/snippets/${id}`),
  searchSnippets: (q) => request(`/snippets/search?q=${encodeURIComponent(q)}`),
  createSnippet: (body) => request('/snippets', { method: 'POST', body: JSON.stringify(body) }),
  updateSnippet: (id, body) => request(`/snippets/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteSnippet: (id) => request(`/snippets/${id}`, { method: 'DELETE' }),
};
