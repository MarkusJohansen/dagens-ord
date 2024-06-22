import { suggestNewExpression } from "@/api-client";
import { Expression } from "@/types";
import { useState } from "react";

export const useSuggest = (props: Expression) => {
  const [isSubmitting, setIsSubmitting] = useState(true);

  const suggest = async () => {
    console.log(props);

    if (props && props.expression && props.example && props.definition) {
      const { data, error } = await suggestNewExpression(props);
      if (error) {
        console.error("Error fetching new expression", error);
      }
      if (data) {
        setIsSubmitting(false);
      }
    }
  };

  return { suggest, isSubmitting };
};
