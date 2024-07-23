import { fetchAllExpressions } from "@/api-client";
import { Expression } from "@/types";
import { useEffect, useState } from "react";

export const useGetNewExpression = () => {
  const [expression, setExpression] = useState<Expression | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewExpression = async () => {
      if (!expression) {
        const { data, error } = await fetchAllExpressions();
        if (error) {
          console.error("Error fetching new expression", error);
        }
        if (data) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomRow = data[randomIndex];
          setExpression(randomRow);
          setIsLoading(false);
        }
      }
    };

    fetchNewExpression();
  }, []);

  return { expression, isLoading };
};
