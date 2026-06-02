export const compressAndCropImage = ({
  imgUrl,
  setImageError,
  targetWidth,
  targetHeight,
  vCrop = "middle",
  hCrop = "center",
}: {
  imgUrl: string;
  setImageError?: (error: { errorType: string; fileName: string }) => void;
  targetWidth: number;
  targetHeight: number;
  vCrop?: "top" | "middle" | "bottom";
  hCrop?: "left" | "center" | "right";
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("CANVAS_ERROR"));
        return;
      }

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const xScale = targetWidth / imgWidth;
      const yScale = targetHeight / imgHeight;

      let scaledWidth = imgWidth;
      let scaledHeight = imgHeight;

      if (xScale > yScale) {
        scaledHeight = targetHeight / xScale;
      } else if (xScale < yScale) {
        scaledWidth = targetWidth / yScale;
      }

      let dx = 0;
      if (hCrop === "center") dx = (imgWidth - scaledWidth) / 2;
      if (hCrop === "right") dx = imgWidth - scaledWidth;

      let dy = 0;
      if (vCrop === "middle") dy = (imgHeight - scaledHeight) / 2;
      if (vCrop === "bottom") dy = imgHeight - scaledHeight;

      ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight, 0, 0, targetWidth, targetHeight);

      const resultDataUrl = canvas.toDataURL("image/png");
      resolve(resultDataUrl);
    };

    img.onerror = () => {
      if (setImageError) {
        setImageError({
          errorType: "UPLOAD_ERROR",
          fileName: imgUrl,
        });
      }
      reject(new Error("LOAD_ERROR"));
    };

    img.src = imgUrl;
  });
};
