import { useCallback, useEffect, useState } from "react";

type TElementDimensions = {
  elementWidth: number;
  elementHeight: number;
  contentWidth: number;
  contentHeight: number;
  top: number;
  left: number;
};

type TUseElementDimensionsOptions = {
  observeMutations?: boolean;
  observeWindowResize?: boolean;
};

const INITIAL: TElementDimensions = {
  elementWidth: 0,
  elementHeight: 0,
  contentWidth: 0,
  contentHeight: 0,
  top: 0,
  left: 0,
};

/**
 * Возвращает актуальные размеры элемента по ref.
 *
 * Реагирует на:
 *  - изменение размеров элемента (ResizeObserver);
 *  - изменение DOM-содержимого (MutationObserver);
 *  - ресайз окна (window resize);
 *  - появление элемента в DOM (если ref был null при монтировании).
 */
export function useElementDimensions<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options: TUseElementDimensionsOptions = {},
): TElementDimensions {
  const { observeMutations = false, observeWindowResize = true } = options;

  const [dimensions, setDimensions] = useState<TElementDimensions>(INITIAL);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) {
      setDimensions((prev) => (prev === INITIAL ? prev : INITIAL));
      return;
    }

    const rect = el.getBoundingClientRect();
    const next: TElementDimensions = {
      elementWidth: rect.width,
      elementHeight: rect.height,
      contentWidth: el.clientWidth,
      contentHeight: el.clientHeight,
      top: rect.top,
      left: rect.left,
    };

    setDimensions((prev) => {
      if (
        prev.elementWidth === next.elementWidth &&
        prev.elementHeight === next.elementHeight &&
        prev.contentWidth === next.contentWidth &&
        prev.contentHeight === next.contentHeight &&
        prev.top === next.top &&
        prev.left === next.left
      ) {
        return prev;
      }
      return next;
    });
  }, [ref]);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      const raf = requestAnimationFrame(measure);
      return () => cancelAnimationFrame(raf);
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);

    let mutationObserver: MutationObserver | null = null;
    if (observeMutations) {
      mutationObserver = new MutationObserver(measure);
      mutationObserver.observe(el, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    const handleWindowResize = (): void => measure();
    if (observeWindowResize) {
      window.addEventListener("resize", handleWindowResize, { passive: true });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver?.disconnect();
      if (observeWindowResize) {
        window.removeEventListener("resize", handleWindowResize);
      }
    };
  }, [ref, measure, observeMutations, observeWindowResize]);

  return dimensions;
}

// import { RefObject, useLayoutEffect, useState } from "react";

// export function useElementDimensions(ref: RefObject<HTMLDivElement>) {
//   const [elementDimensions, setElementDimensions] = useState({
//     elementWidth: 0,
//     elementHeight: 0,
//   });

//   useLayoutEffect(() => {
//     const divElement: HTMLDivElement | null = ref.current;

//     const handleResize = () => {
//       if (divElement) {
//         setElementDimensions({
//           elementWidth: divElement.clientWidth,
//           elementHeight: divElement.clientHeight,
//         });
//       }
//     };

//     if (divElement) {
//       setElementDimensions({
//         elementWidth: divElement.clientWidth,
//         elementHeight: divElement.clientHeight,
//       });
//       window.addEventListener("resize", handleResize);
//     }

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return elementDimensions;
// }
