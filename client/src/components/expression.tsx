interface ExpressionProps {
  word: string;
  example: string;
  explanation: string;
}

const Expression = ({ word, example, explanation }: ExpressionProps) => {
  return (
    <div className="text-left w-full">
      <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-dark-gray">
        {word}
      </h1>
      <hr />
      <h2 className="text-lg md:text-xl lg:text-2xl mb-2 ">{example}</h2>
      <italic className="md:text-lg lg:text-xl">{explanation}</italic>
    </div>
  );
};

export default Expression;
