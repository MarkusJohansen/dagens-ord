import { useEffect, useRef, useState } from "react";

export function useFitText(text: string) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(160);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text.trim()) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;

      const style = window.getComputedStyle(parent);
      const availableWidth =
        parent.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);

      // Temporarily set full text for measurement (no repaint — happens before next frame)
      const saved = el.textContent;
      el.textContent = text;
      el.style.whiteSpace = "nowrap";

      let low = 8;
      let high = 700;
      while (high - low > 1) {
        const mid = Math.floor((low + high) / 2);
        el.style.fontSize = `${mid}px`;
        if (el.scrollWidth <= availableWidth) low = mid;
        else high = mid;
      }

      el.textContent = saved;
      setFontSize(low);
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(el.parentElement!);
    return () => observer.disconnect();
  }, [text]);

  return { ref, fontSize };
}
