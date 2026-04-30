import { fetchNsfwExpression } from "@/api-client";
import { Expression } from "@/types";
import { useEffect, useState } from "react";

export const useGetNsfwExpression = () => {
  const [expression, setExpression] = useState<Expression | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNew = async () => {
      const today = new Date().toISOString().split("T")[0];
      const lastFetchDate = localStorage.getItem("nsfwLastFetchDate");
      const stored = localStorage.getItem("nsfwStoredExpression");

      if (stored && lastFetchDate === today) {
        setExpression(JSON.parse(stored));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const { data, error } = await fetchNsfwExpression();
      if (error) console.error("Error fetching NSFW expression", error);
      if (data) {
        setExpression(data[0]);
        localStorage.setItem("nsfwLastFetchDate", today);
        localStorage.setItem("nsfwStoredExpression", JSON.stringify(data[0]));
      }
      setIsLoading(false);
    };

    fetchNew();
  }, []);

  return { expression, isLoading };
};
