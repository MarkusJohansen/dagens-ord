import { createContext, useEffect, useState } from "react";

type ColorContextType = {
  color: string;
};

export const ColorContext = createContext<ColorContextType>({
  color: "#bae6fd",
});

export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colors = ["#CCD5AE", "#E9EDC9", "#FEFAE0", "#FAEDCD", "#D4A373"];

  const [color, setColor] = useState(() => {
    const cachedColor = localStorage.getItem("color");
    return cachedColor
      ? cachedColor
      : colors[Math.floor(Math.random() * colors.length)];
  });

  const updateColor = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(newColor);
    localStorage.setItem("color", newColor);
    localStorage.setItem("colorUpdateTime", Date.now().toString());
    return newColor;
  };

  useEffect(() => {
    const colorUpdateTime = localStorage.getItem("colorUpdateTime");
    if (
      !colorUpdateTime ||
      Date.now() - Number(colorUpdateTime) > 24 * 60 * 60 * 1000
    ) {
      updateColor();
    }
  }, []);

  return (
    <ColorContext.Provider value={{ color }}>{children}</ColorContext.Provider>
  );
};
