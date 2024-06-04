interface ExpressionProps {
  word: string;
  example: string;
  explanation: string;
}

const Expression = ({ word, example, explanation }: ExpressionProps) => {
  return (
    <div className="text-left">
      <h1 className="text-8xl font-bold mt-48">{word}</h1>
      <hr />
      <h2 className="text-4xl mb-2">{example}</h2>
      <p className="text-2xl">{explanation}</p>
    </div>
  );
};

export default Expression;
