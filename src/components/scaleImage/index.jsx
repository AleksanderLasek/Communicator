import { createCanvas} from "canvas";

export const scaleImage = (imageData, width, height) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const outputBase64 = canvas.toDataURL();
        resolve(outputBase64);
      };
      img.onerror = reject;
      img.src = imageData;
    });
  };