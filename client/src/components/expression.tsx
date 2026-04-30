interface ExpressionProps {
  word: string;
  example: string;
  explanation: string;
}

export const Expression = ({ word, example, explanation }: ExpressionProps) => {
  return (
    <div className="text-left w-full border-2 border-black border-b-0 last:border-b-2 p-5 hover:bg-black hover:text-white transition-colors group">
      <p className="text-xl font-black uppercase tracking-wide">{word}</p>
      <p className="italic font-medium mt-1 group-hover:text-white">{example}</p>
      <p className="text-sm mt-1 opacity-70 group-hover:opacity-90">{explanation}</p>
    </div>
  );
};
