import { fetchExpression } from "@/api-client";
import { Expression } from "@/types";
import { useEffect, useState } from "react";

function getCachedExpression(): Expression | null {
  const today = new Date().toISOString().split("T")[0];
  const lastFetchDate = localStorage.getItem("lastFetchDate");
  const stored = localStorage.getItem("storedExpression");
  if (stored && lastFetchDate === today) return JSON.parse(stored);
  return null;
}

export const useGetNewExpression = () => {
  const [expression, setExpression] = useState<Expression | null>(getCachedExpression);
  const [isLoading, setIsLoading] = useState(() => getCachedExpression() === null);

  useEffect(() => {
    if (expression) return;

    const fetch = async () => {
      const { data, error } = await fetchExpression();
      if (error) { console.error("Error fetching new expression", error); setIsLoading(false); return; }
      if (data) {
        const today = new Date().toISOString().split("T")[0];
        const randomExpression = data[0];
        setExpression(randomExpression);
        localStorage.setItem("lastFetchDate", today);
        localStorage.setItem("storedExpression", JSON.stringify(randomExpression));
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return { expression, isLoading };
};
