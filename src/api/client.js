const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

async function request(path, options = {}) {
  const token = localStorage.getItem('aria_access_token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    const refreshed = await tryRefresh();
    if (refreshed) return request(path, options);
    localStorage.removeItem('aria_access_token');
    localStorage.removeItem('aria_refresh_token');
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || err.message || 'Request failed');
  }

  return res.json();
}

async function tryRefresh() {
  const refreshToken = localStorage.getItem('aria_refresh_token');
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    localStorage.setItem('aria_access_token', data.data.access_token);
    localStorage.setItem('aria_refresh_token', data.data.refresh_token);
    return true;
  } catch { return false; }
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path) => request(path, { method: 'DELETE' }),
};
