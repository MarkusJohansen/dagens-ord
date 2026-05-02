import { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";

const Streak = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split("T")[0];
    const cachedStreak = localStorage.getItem("streak");
    const lastFetchDate = localStorage.getItem("lastFetchDate");

    if (lastFetchDate === yesterday && cachedStreak) {
      const next = 1 + parseInt(cachedStreak);
      setStreak(next);
      localStorage.setItem("streak", next.toString());
    } else if (lastFetchDate === today && cachedStreak) {
      setStreak(parseInt(cachedStreak));
    } else {
      setStreak(0);
      localStorage.setItem("streak", "0");
    }
  }, []);

  if (streak > 0)
    return (
      <div className="flex items-center gap-1 border-2 border-black px-2 py-1 shadow-brutal-sm bg-white mr-3">
        <FaFire size={18} className="text-black" />
        <span className="text-lg font-black">{streak}</span>
      </div>
    );
  return <></>;
};

export default Streak;
