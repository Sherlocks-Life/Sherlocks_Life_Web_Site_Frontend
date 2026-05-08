export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://sherlocks-life-web-site-backend.onrender.com';

export const apiUrl = (path) => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
};

export const authHeader = (token) => {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};
