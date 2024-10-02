import { createClient } from '@supabase/supabase-js';
import type { Expression, Suggestion } from './types';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const getSuggestions = async () => {
  const { data, error } = await supabase.from("suggestions").select("*");

  return { data, error };
};

export const addSuggestion = async (suggestion: Expression) => {
  const { error } = await supabase
    .from('expressions')
    .insert([suggestion]);

  return { error };
};

export const updateSuggestion = async (suggestion: Suggestion) => {  
  const { data, error } = await supabase
    .from('suggestions')
    .update({
      expression: suggestion.expression,
      example: suggestion.example,
      definition: suggestion.definition
     })
    .eq('id', suggestion.id);

  return { data, error };
};

export const deleteSuggestion = async (suggestion: Suggestion) => {
  const { data, error } = await supabase
    .from("suggestions")
    .delete()
    .eq("id", suggestion.id);

    return { data, error };
};

export const signIn = async (userEmail: string, userPassword: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword
  });

  return { data, error };
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
}
