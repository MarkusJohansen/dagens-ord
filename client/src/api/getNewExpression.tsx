import axios from "axios";
import { API_URL } from "../utils/config";
import { useState } from "react";
import { Expression } from "../utils/types";

type ExpressionState = {
  expression?: Expression; // Optional expression data
  isLoading: boolean;
  error?: unknown; // Any type for potential error information
};

export const GetNewExpression = async () => {
  const [state, setState] = useState<ExpressionState>({
    isLoading: true,
  });
  try {
    const response = await axios.get(`${API_URL}/new`);
    setState({
      expression: response.data,
      isLoading: false,
    });
  } catch (error) {
    setState({
      isLoading: false,
      error: error,
    });
  }
  return state;
};
