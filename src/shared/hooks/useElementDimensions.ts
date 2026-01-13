import { RefObject, useEffect, useState } from "react";

export function useElementDimensions(ref: RefObject<HTMLDivElement>) {
  const [elementDimensions, setElementDimensions] = useState({
    elementWidth: 0,
    elementHeight: 0,
  });

  useEffect(() => {
    const divElement: HTMLDivElement | null = ref.current;

    const handleResize = () => {
      if (divElement)
        setElementDimensions({
          elementWidth: divElement.clientWidth,
          elementHeight: divElement.clientHeight,
        });
    };

    if (divElement) {
      setElementDimensions({
        elementWidth: divElement.clientWidth,
        elementHeight: divElement.clientHeight,
      });
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return elementDimensions;
}
