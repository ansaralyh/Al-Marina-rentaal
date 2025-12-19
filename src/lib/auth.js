// Auth utility functions
export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken");
  }
  return null;
};

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminToken", token);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminLoggedIn");
  }
};

export const getAuthUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("adminUser");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const setAuthUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminUser", JSON.stringify(user));
    localStorage.setItem("adminLoggedIn", "true");
  }
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Authenticated fetch helper - automatically includes auth token
export const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If unauthorized, clear token and redirect to login
  if (response.status === 401) {
    removeAuthToken();
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
      window.location.href = "/admin/login";
    }
  }

  return response;
};

