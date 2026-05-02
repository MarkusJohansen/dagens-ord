export type Suggestion = {
  id: number;
  expression: string;
  example: string;
  definition: string;
};

export type Expression = {
  expression: string;
  example: string;
  definition: string;
  nsfw: boolean;
};

export type ExpressionRecord = {
  id: number;
  expression: string;
  example: string;
  definition: string;
  nsfw: boolean;
};
