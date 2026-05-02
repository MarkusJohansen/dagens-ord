import { suggestNewExpression } from "@/api-client";
import { SuggestExpression } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSuggest = (expression: SuggestExpression) => {
  const [isSubmitting, setIsSubmitting] = useState(true);

  const suggest = async () => {
    if (!expression?.expression || !expression?.example || !expression?.definition) {
      toast.error("Fyll ut alle feltene!");
      return;
    }
    if (expression.example.length < 4) {
      toast.error("Eksempel må ha minst 4 tegn.");
      return;
    }
    if (expression.definition.length < 4) {
      toast.error("Forklaring må ha minst 4 tegn.");
      return;
    }
    const { error } = await suggestNewExpression(expression);
    if (error) {
      setIsSubmitting(false);
      toast.error("Oi, noe gikk galt!");
    } else {
      setIsSubmitting(false);
      toast.success("Takk for ditt forslag!");
    }
  };

  return { suggest, isSubmitting };
};
