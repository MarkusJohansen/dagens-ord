import { fetchAllExpressions } from "@/api-client";
import { Expression } from "@/types";
import { useEffect, useState } from "react";

export const useGetNewExpression = () => {
  const [expression, setExpression] = useState<Expression | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewExpression = async () => {
      const lastFetchDate = localStorage.getItem("lastFetchDate");
      const today = new Date().toISOString().split("T")[0];
      const storedExpression = localStorage.getItem("storedExpression");

      if (storedExpression && lastFetchDate === today) {
        // Use the stored expression if it's still valid for today
        setExpression(JSON.parse(storedExpression));
        setIsLoading(false);
      } else {
        // Fetch a new expression and update storage
        setIsLoading(true);
        const { data, error } = await fetchAllExpressions();
        if (error) {
          console.error("Error fetching new expression", error);
          setIsLoading(false);
        }
        if (data) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomExpression = data[randomIndex];
          setExpression(randomExpression);
          localStorage.setItem("lastFetchDate", today);
          localStorage.setItem(
            "storedExpression",
            JSON.stringify(randomExpression)
          );
          setIsLoading(false);
        }
      }
    };

    fetchNewExpression();
  }, []);

  return { expression, isLoading };
};
