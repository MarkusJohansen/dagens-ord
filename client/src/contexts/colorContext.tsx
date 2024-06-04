import { createContext, useState } from "react";

type ColorContextType = {
  color: string;
};

export const ColorContext = createContext<ColorContextType>({
  color: "#bae6fd",
});

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colors = [
    "#ffffff", // white
    "#fecaca", // red-200
    "#fed7aa", // orange-200
    "#f6bd60", // mustard
    "#caf0f8", // sky
    "#e9edc9", // light-green
    "#faedcd", //tan
  ];

  const [color] = useState(colors[Math.floor(Math.random() * colors.length)]);

  return (
    <ColorContext.Provider value={{ color }}>{children}</ColorContext.Provider>
  );
};
