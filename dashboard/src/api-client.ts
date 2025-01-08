import type { Expression, Suggestion } from "./types";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const getSuggestions = async () => {
  try {
    const response = await fetch(`${serverUrl}/suggestions`);
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getExpressions = async () => {
  try {
    const response = await fetch(`${serverUrl}/expressions`);
    const data = await response.json();
    return { data: data.items, count: data.count, error: null };
  } catch (error) {
    return { data: null, count: 0, error };
  }
};

export const fetchAllExpressions = async () => {
  const response = await fetch(`${serverUrl}/expressions`);
  const { data, error } = await response.json();
  return { data, error };
};

export const addSuggestion = async (suggestion: Expression) => {
  try {
    const response = await fetch(`${serverUrl}/suggest/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(suggestion),
    });

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { error };
  }
};

export const updateSuggestion = async (suggestion: Suggestion) => {
  try {
    const response = await fetch(`${serverUrl}/suggestions/${suggestion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(suggestion),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData };
    }

    return { error: null };
  } catch (error) {
    return { error };
  }
};

export const deleteSuggestion = async (suggestion: Suggestion) => {
  try {
    const response = await fetch(`${serverUrl}/suggestions/${suggestion.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete suggestion.");
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Sign in user
export const signIn = async (userEmail: string, userPassword: string) => {
  try {
    const response = await fetch(`${serverUrl}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { data: null, error: errorData };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Sign out user
export const signOut = async () => {
  try {
    const response = await fetch(`${serverUrl}/auth/sign-out`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to sign out.");
    }

    return { error: null };
  } catch (error) {
    return { error };
  }
};
