const API_BASE_URL = "http://127.0.0.1:5000"; // Flask backend URL

export const api = {
  getTemplates: () => apiRequest("/templates"),
  getFavorites: (userId) => apiRequest(`/users/${userId}/favorites`),
  addFavorite: (userId, templateId) => apiRequest(`/users/${userId}/favorites`, "POST", { template_id: templateId }),
  removeFavorite: (userId, templateId) => apiRequest(`/users/${userId}/favorites/${templateId}`, "DELETE"),
};

// Generic request helper for all API calls
export async function apiRequest(endpoint, method = "GET", data = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = {
    method,
    headers,
  };

  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`API Error (${response.status}): ${message}`);
  }

  return await response.json();
}
