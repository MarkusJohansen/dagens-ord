import { fetchNsfwExpression } from "@/api-client";
import { Expression } from "@/types";
import { useEffect, useState } from "react";

export const useGetNsfwExpression = () => {
  const [expression, setExpression] = useState<Expression | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const { data, error } = await fetchNsfwExpression();
      if (error) console.error("Error fetching NSFW expression", error);
      if (data) setExpression(data[0]);
      setIsLoading(false);
    };
    fetch();
  }, []);

  return { expression, isLoading };
};
