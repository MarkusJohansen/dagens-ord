import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const fetchAllExpressions = async () => {
  const { data, error } = await supabase.from("expressions").select("*");
  return { data, error };
};
