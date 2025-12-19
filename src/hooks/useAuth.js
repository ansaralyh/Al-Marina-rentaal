"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthToken, getAuthUser, setAuthToken, setAuthUser, removeAuthToken } from "../lib/auth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Verify token
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    const storedUser = getAuthUser();

    if (token && storedUser) {
      setUser(storedUser);
      // Verify token with backend
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const res = await fetch(`${apiUrl}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setAuthUser(data.user);
      } else {
        // Token invalid, clear auth
        removeAuthToken();
        setUser(null);
      }
    } catch (error) {
      removeAuthToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    router.push("/admin/login");
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
  };
};

// Login mutation
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }

      return res.json();
    },
    onSuccess: (data) => {
      setAuthToken(data.token);
      setAuthUser(data.user);
      queryClient.setQueryData(["auth"], data.user);
      router.push("/admin");
    },
  });
};

