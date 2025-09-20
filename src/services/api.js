import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || '';

export async function postChat({ message, sessionId }) {
  const { data } = await axios.post(`${API_BASE}/api/chat`, { message, sessionId });
  return data;
}

export async function getHistory(sessionId) {
  const { data } = await axios.get(`${API_BASE}/api/history/${sessionId}`);
  return data;
}

export async function resetSession(sessionId) {
  const { data } = await axios.delete(`${API_BASE}/api/reset/${sessionId}`);
  return data;
}
