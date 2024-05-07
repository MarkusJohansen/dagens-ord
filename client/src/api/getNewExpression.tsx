import axios from "axios";
import { config } from "../utils/config";
import { useState, useEffect } from "react";
import { Expression } from "../utils/types";

type ExpressionState = {
  expression?: Expression; // Optional expression data
  isLoading: boolean;
  error?: unknown; // Any type for potential error information
};

/**
 * @param expressionString The expression is currently received as a string.
 * @returns The string parsed to an Expression object.
 */
const parseExpression = (expressionString: string): Expression => {
  const lines = expressionString.split("\n");
  return {
    id: Number(lines[1]),
    expression: lines[2],
    example: lines[3],
    definition: lines[4],
  };
};

export const GetNewExpression = () => {
  const [expression, setExpression] = useState<ExpressionState>({
    isLoading: true,
  });

  const API_URL = config.API_URL;

  useEffect(() => {
    const fetchExpression = async () => {
      try {
        const response = await axios.get(`${API_URL}/get`);
        setExpression({
          expression: parseExpression(response.data),
          isLoading: false,
        });
      } catch (error) {
        setExpression({
          isLoading: false,
          error: error,
        });
      }
    };
    fetchExpression();
  }, []);
  return expression;
};
