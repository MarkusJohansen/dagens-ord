export type Expression = {
  id: number;
  expression: string;
  example: string;
  definition: string;
  nsfw: boolean;
};

export type SuggestExpression = {
  id: number;
  expression: string;
  example: string;
  definition: string;
};
