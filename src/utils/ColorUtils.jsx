import ColorThief from 'color-thief-browser';

export const getDominantColor = (imageUrl, callback) => {
  const colorThief = new ColorThief();
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = imageUrl;
  img.onload = () => {

    try {
      const dominantColor = colorThief.getColor(img);
      const [r, g, b] = dominantColor;

      // Calculate brightness
      const brightness = (0.2126 * r + 0.7152 * g + 0.0722 * b);

      // Adjust color based on brightness
      const adjustColor = (value, adjustment) => Math.max(0, Math.min(255, value + adjustment));
      const darkColor = `rgba(${adjustColor(r, -255)}, ${adjustColor(g, -255)}, ${adjustColor(b, -255)}, 1)`;

      // Use complementary dark color for light images
      const gradientColor = brightness < 100
        ? `linear-gradient(to bottom left, ${darkColor}, rgba(${r}, ${g}, ${b}, 1))`
        : `linear-gradient(to top right, rgba(${r}, ${g}, ${b}, 1), ${darkColor})`;

      callback(gradientColor);
    } catch {
      // Fallback gradient
      callback('linear-gradient(to bottom right, black, darkblue, darkbrown)');
    }
  };
};
