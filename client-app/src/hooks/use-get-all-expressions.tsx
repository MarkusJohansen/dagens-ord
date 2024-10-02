import { fetchAllExpressions } from "@/api-client";
import { Expression } from "@/types";
import { useState, useEffect } from "react";

export const useGetAllExpressions = () => {
  const [expressions, setExpressions] = useState<Expression[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewAllExpressions = async () => {
      setIsLoading(true);
      const { data, error } = await fetchAllExpressions();
      if (error) {
        console.error("Error fetching all expressions", error);
        setIsLoading(false);
      }
      if (data) {
        setExpressions(data);
        setIsLoading(false);
      }
    };

    fetchNewAllExpressions();
  }, []);

  return { expressions, isLoading };
};
