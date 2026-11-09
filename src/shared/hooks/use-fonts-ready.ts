// hooks/useFontsReady.ts
import { useEffect, useState } from "react";

export function useFontsReady(): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!("fonts" in document)) {
      setIsReady(true);
      return;
    }

    let cancelled = false;

    document.fonts.ready.then(() => {
      if (!cancelled) setIsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return isReady;
}
