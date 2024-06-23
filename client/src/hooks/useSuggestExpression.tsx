import { suggestNewExpression } from "@/api-client";
import { Expression } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSuggest = (props: Expression) => {
  const [isSubmitting, setIsSubmitting] = useState(true);

  const suggest = async () => {
    if (props && props.expression && props.example && props.definition) {
      const { error } = await suggestNewExpression(props);
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
