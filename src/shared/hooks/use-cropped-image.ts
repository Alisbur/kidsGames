import { useCallback, useEffect, useState } from "react";

import { compressAndCropImage } from "../helpers/compress-and-crop-image";

type TDimensions = { maxW: number; maxH: number };

interface CacheEntry {
  dataUrl: string;
  timestamp: number;
}
const cropCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 минут

const getCacheKey = (imgUrl: string, maxW: number, maxH: number): string =>
  `${imgUrl}|${maxW}|${maxH}`;

const cleanExpiredCache = () => {
  const now = Date.now();
  for (const [key, entry] of cropCache.entries()) {
    if (now - entry.timestamp > CACHE_TTL_MS) {
      cropCache.delete(key);
    }
  }
};

export function useCroppedImage() {
  const [imgUrl, setImgUrl] = useState("");
  const [targetDimensions, setTargetDimensions] = useState<TDimensions | null>(null);
  const [croppedUrl, setCroppedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!imgUrl || !targetDimensions) {
      setCroppedUrl("");
      setError(null);
      setIsLoading(false);
      return;
    }

    cleanExpiredCache();

    const { maxW, maxH } = targetDimensions;
    const cacheKey = getCacheKey(imgUrl, maxW, maxH);
    const now = Date.now();
    const cached = cropCache.get(cacheKey);

    if (cached && now - cached.timestamp <= CACHE_TTL_MS) {
      setCroppedUrl(cached.dataUrl);
      setError(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setCroppedUrl("");

    compressAndCropImage({
      imgUrl,
      targetWidth: maxW,
      targetHeight: maxH,
    })
      .then((result) => {
        if (!cancelled) {
          cropCache.set(cacheKey, { dataUrl: result, timestamp: Date.now() });
          setCroppedUrl(result);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          if (!cancelled) {
            setError(err instanceof Error ? err : new Error(String(err)));
          }
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [imgUrl, targetDimensions]);

  const cropImage = useCallback(
    ({ img, maxW, maxH }: { img: string } & TDimensions) => {
      if (!img) return;
      if (img === imgUrl && targetDimensions?.maxW === maxW && targetDimensions?.maxH === maxH) {
        return;
      }
      setImgUrl(img);
      setTargetDimensions({ maxW, maxH });
    },
    [imgUrl, targetDimensions],
  );

  const resetCrop = () => {
    setImgUrl("");
    setTargetDimensions(null);
    setCroppedUrl("");
    setIsLoading(false);
    setError(null);
  };

  return { croppedUrl, cropImage, size: targetDimensions, resetCrop, isLoading, error };
}
