import { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";

const Streak = () => {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0];
  const cachedStreak = localStorage.getItem("streak");
  const lastFetchDate = localStorage.getItem("lastFetchDate");
  const [streak, setStreak] = useState(0);

  // Set streak
  useEffect(() => {
    if (lastFetchDate == yesterday && cachedStreak) {
      setStreak(1 + parseInt(cachedStreak.valueOf()));
      localStorage.setItem("streak", (1 + parseInt(cachedStreak.valueOf())).toString());
    } else if (lastFetchDate == today && cachedStreak) {
      setStreak(parseInt(cachedStreak.valueOf()));
    } else {
      setStreak(0);
      localStorage.setItem("streak", "0");
    }
  }, [])

  if (streak > 0) return (
    <div className="flex mr-8 items-center">
      <FaFire size={22}/>
      <p className="text-2xl font-semibold ml-1 font-logo">
        {streak}
      </p>
    </div>
  ); else return <></>
};

export default Streak;
