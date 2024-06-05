interface ExpressionProps {
  word: string;
  example: string;
  explanation: string;
}

const Expression = ({ word, example, explanation }: ExpressionProps) => {
  return (
    <div className="text-left w-full">
      <h1 className="text-xl md:text-4xl lg:text-8xl font-bold">{word}</h1>
      <hr />
      <h2 className="text-lg md:text-2xl lg:text-4xl mb-2">{example}</h2>
      <p className="md:text-xl lg:text-2xl">{explanation}</p>
    </div>
  );
};

export default Expression;
