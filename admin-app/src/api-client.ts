import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const getSuggestions = async () => {
  const { data, error } = await supabase.from("suggestions").select("*");

  console.log(supabase);

  if (error) {
    console.error("Error fetching suggestions:", error);
  } else {
    console.log("Fetched suggestions:", data);
  }

  return data;
};

export const addSuggestion = async (suggestion: string, example: string, definition: string) => {
  const { data, error } = await supabase
    .from('suggestions')
    .insert([{ suggestion, example, definition }]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateSuggestion = async (id: string, suggestion: string) => {
  const { data, error } = await supabase
    .from('suggestions')
    .update({ suggestion })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
