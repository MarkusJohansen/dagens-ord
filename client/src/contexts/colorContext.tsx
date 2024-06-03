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
  const [color, setColor] = useState(() => {
    const cachedColor = localStorage.getItem("color");
    return cachedColor ? cachedColor : "#bae6fd";
  });

  useEffect(() => {
    const colors = [
      "#ffffff", // white
      "#fecaca", // red-200
      "#fed7aa", // orange-200
      "#fde68a", // amber-200
      "#fef08a", // yellow-200
      "#d9f99d", // lime-200
      "#bbf7d0", // green-200
      "#a7f3d0", // emerald-200
      "#99f6e4", // teal-200
      "#93e4c1", // cyan-200
      "#bae6fd", // sky-200
      "#bfdbfe", // blue-200
      "#c7d2fe", // indigo-200
      "#ddd6fe", // violet-200
      "#e9d5ff", // purple-200
      "#f5d0fe", // fuchsia-200
    ];

    const updateColor = () => {
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(newColor);
      localStorage.setItem("color", newColor);
      localStorage.setItem("colorUpdateTime", Date.now().toString());
      return newColor;
    };

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
