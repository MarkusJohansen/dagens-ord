interface ExpressionProps {
  word: string;
  example: string;
  explanation: string;
}

export const Expression = ({ word, example, explanation }: ExpressionProps) => {
  return (
    <div className="text-left w-full">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">{word}</h1>
      <hr />
      <h2 className="text-lg md:text-xl lg:text-2xl mb-2 ">{example}</h2>
      <p className="md:text-lg lg:text-xl">{explanation}</p>
    </div>
  );
};
