const {fontSize, spacing} = require('tailwindcss/defaultTheme');
function scaleRemValues(obj, factor) {
  const scaled = {};
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === 'string' && val.endsWith('rem')) {
      const num = parseFloat(val);
      scaled[key] = `${(num * factor).toFixed(4)}rem`;
    } else if (Array.isArray(val) && typeof val[0] === 'string' && val[0].endsWith('rem')) {
      const num = parseFloat(val[0]);
      const scaledLineHeight = val[1]?.lineHeight
        ? `${(parseFloat(val[1].lineHeight) * factor).toFixed(4)}rem`
        : undefined;

      scaled[key] = [
        `${(num * factor).toFixed(4)}rem`,
        scaledLineHeight ? { lineHeight: scaledLineHeight } : undefined,
      ];
    } else {
      scaled[key] = val;
    }
  }
  return scaled;
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: scaleRemValues(fontSize, 0.75),
      spacing: scaleRemValues(spacing, 0.75),      
      colors: {
        primary: {
          background: "#0b3954",
          foreground: "#ffffff",
          light: "#1a4a66",
          dark: "#083042",
        },
        secondary: {
          background: "#e76f51",
          foreground: "#ffffff",
          light: "#eb8268",
          dark: "#d65a3f",
        },
        accent: {
          DEFAULT: "#f4a261",
          foreground: "#ffffff",
          light: "#f6b47a",
          dark: "#e89a5c",
        },
        neutral: {
          background: "#f9f9f9",
          foreground: "#2c2c2c",
          light: "#ffffff",
          dark: "#1a1a1a",
        },
        border: {
          primary: "#cfcfcf",
          secondary: "#999999",
          light: "#e0e0e0",
          dark: "#666666",
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        yeseva: ['"Yeseva One"', 'cursive'],
      },
      boxShadow: {
        'custom-light': '6px 6px 15px rgba(185,185,185,0.9)',
        'custom-medium': '15px 15px 38px rgba(209,213,215,0.9)',
        'custom-heavy': '0px 4px 12px rgba(136,136,136,1)',
        'custom-blue': '0px 16px 26px rgba(71,186,255,0.3)',
        'custom-donate': 'inset 0px 16px 26.9px 0px rgba(71, 187, 255, 0.30)',
        'custom-campaign': 'inset 0px 18px 28px 0px rgba(231, 111, 81, 0.30)',
        'custom-oval': '0 0 600px 200px rgba(0, 0, 0, 0.8)',
        'custom-oval-mobile': '0 0 200px 150px rgba(0, 0, 0, 0.7)',
        'custom-mission-vision': '1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset, -1px -1px 2px 0px rgba(185, 185, 185, 0.50) inset, -6px 6px 12px 0px rgba(185, 185, 185, 0.20), 6px -6px 12px 0px rgba(185, 185, 185, 0.20)',
        'custom-content-card': "inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(185, 185, 185, 0.5), -6px 6px 12px rgba(185, 185, 185, 0.2), 6px -6px 12px rgba(185, 185, 185, 0.2), -6px -6px 12px rgba(255, 255, 255, 0.9),6px 6px 15px rgba(185, 185, 185, 0.9)",
        'custom-numKeys': '1px 1px 2px 0px rgba(255, 255, 255, 0.30) inset, -1px -1px 2px 0px rgba(185, 185, 185, 0.50) inset, -6px 6px 12px 0px rgba(185, 185, 185, 0.20), 6px -6px 12px 0px rgba(185, 185, 185, 0.20), -6px -6px 12px 0px rgba(255, 255, 255, 0.90), 6px 6px 15px 0px rgba(185, 185, 185, 0.90)',
        'custom-numButton': '1px 1px 2px 0px rgba(255, 178, 107, 0.30) inset, -1px -1px 2px 0px rgba(220, 146, 87, 0.50) inset, -10px 10px 20px 0px rgba(220, 146, 87, 0.20), 10px -10px 20px 0px rgba(220, 146, 87, 0.20), -10px -10px 20px 0px rgba(255, 178, 107, 0.90), 10px 10px 25px 0px rgba(220, 146, 87, 0.90)',
      },
    },
  },
  plugins: [],
};