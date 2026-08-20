// hooks/useScreenOrientation.ts
import { useEffect, useState } from "react";

type ScreenOrientationType = "portrait" | "landscape" | "unknown";

export const useScreenOrientation = (): ScreenOrientationType => {
  const [orientation, setOrientation] = useState<ScreenOrientationType>("unknown");

  useEffect(() => {
    const getOrientation = (): ScreenOrientationType => {
      const isMobile = window.matchMedia("(pointer: coarse)").matches;

      if (!isMobile) {
        return "portrait";
      }

      if (screen.orientation) {
        return screen.orientation.type.includes("portrait") ? "portrait" : "landscape";
      }
      if (window.orientation !== undefined) {
        return Math.abs(window.orientation) === 90 ? "landscape" : "portrait";
      }
      if (window.matchMedia) {
        if (window.matchMedia("(orientation: portrait)").matches) return "portrait";
        if (window.matchMedia("(orientation: landscape)").matches) return "landscape";
      }
      return "unknown";
    };

    const updateOrientation = () => {
      setOrientation(getOrientation());
    };

    updateOrientation();

    const handleChange = () => updateOrientation();

    if (screen.orientation) {
      screen.orientation.addEventListener("change", handleChange);
    } else if (window.matchMedia) {
      const mqlPortrait = window.matchMedia("(orientation: portrait)");
      const mqlLandscape = window.matchMedia("(orientation: landscape)");
      mqlPortrait.addEventListener("change", handleChange);
      mqlLandscape.addEventListener("change", handleChange);
    }

    const handleResize = () => updateOrientation();
    window.addEventListener("resize", handleResize);

    return () => {
      if (screen.orientation) {
        screen.orientation.removeEventListener("change", handleChange);
      } else if (window.matchMedia) {
        const mqlPortrait = window.matchMedia("(orientation: portrait)");
        const mqlLandscape = window.matchMedia("(orientation: landscape)");
        mqlPortrait.removeEventListener("change", handleChange);
        mqlLandscape.removeEventListener("change", handleChange);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return orientation;
};
