import { createClient } from "@supabase/supabase-js";
import { Expression } from "./types";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const fetchAllExpressions = async () => {
  const { data, error } = await supabase.from("expressions").select("*");
  return { data, error };
};

export const fetchExpression = async () => {
  const { data, error } = await supabase.from("random_expression").select("*").limit(1);
  return { data, error };
};

export const suggestNewExpression = async (expression: Expression) => {
  const { error } = await supabase.from("suggestions").insert({
    expression: expression.expression,
    example: expression.example,
    definition: expression.definition,
  });
  return { error };
};

export const fetchSuggestionRowCount = async () => {
  const { data, error } = await supabase.from("suggestions").select("id");
  return { data, error };
};
