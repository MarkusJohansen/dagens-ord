import { suggestNewExpression } from "@/api-client";
import { Expression } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSuggest = (expression: Expression) => {
  const [isSubmitting, setIsSubmitting] = useState(true);

  const suggest = async () => {
    if (
      expression &&
      expression.expression &&
      expression.example &&
      expression.definition
    ) {
      const { error } = await suggestNewExpression(expression);
      if (error) {
        setIsSubmitting(false);
        toast.error("Oi, noe gikk galt!");
      } else {
        setIsSubmitting(false);
        toast.success("Takk for ditt forslag!");
      }
    } else {
      toast.error("Fyll ut alle feltene!");
    }
  };

  return { suggest, isSubmitting };
};
