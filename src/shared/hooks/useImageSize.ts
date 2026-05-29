import { useEffect, useState } from "react";

export function useImageSize(url: string | null | undefined) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    const img = new Image();
    img.onload = () => {
      setSize({ width: img.naturalWidth, height: img.naturalHeight });
      setLoading(false);
    };
    img.onerror = () => {
      setError(new Error(`Не удалось загрузить изображение: ${url}`));
      setLoading(false);
    };
    img.src = url;
  }, [url]);

  return { ...size, loading, error };
}
