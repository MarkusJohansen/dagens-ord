import { SuggestExpression } from "./types";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const fetchAllExpressions = async () => {
  const response = await fetch(`${serverUrl}/expressions`);
  const { data, error } = await response.json();
  return { data, error };
};

export const fetchExpression = async () => {
  const response = await fetch(`${serverUrl}/random_expression`);
  const { data, error } = await response.json();
  return { data, error };};


export const suggestNewExpression = async (expression: SuggestExpression) => {
  const response = await fetch(`${serverUrl}/suggest/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expression),
  });

  const { error } = await response.json();
  return { error };
};

export const fetchSuggestionRowCount = async () => {
  const response = await fetch(`${serverUrl}/suggestion_count`);
  const { data, error } = await response.json();
  return { data, error };
};

export const searchExpression = async (query: string) => {
  const response = await fetch(`${serverUrl}/search/${query}`);
  const { data, error } = await response.json();
  return { data, error };
};