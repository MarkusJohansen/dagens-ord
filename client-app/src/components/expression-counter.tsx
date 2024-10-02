import { useGetAllExpressions } from "@/hooks/use-get-all-expressions";
import CountUp from "react-countup";

const easeOutExpo = (t: number, b: number, c: number, d: number): number => {
  return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
};

export const ExpressionCount = () => {
  const { expressions, isLoading } = useGetAllExpressions();

  return (
    <>
      {isLoading ? (
        "0"
      ) : (
        <CountUp
          start={0}
          end={expressions.length}
          duration={2} // Duration in seconds
          easingFn={easeOutExpo}
        />
      )}
    </>
  );
};
