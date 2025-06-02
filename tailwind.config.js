const {fontSize, spacing} = require('tailwindcss/defaultTheme');
function scaleRemValues(obj, factor) {
  const scaled = {};
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === 'string' && val.endsWith('rem')) {
      const num = parseFloat(val);
      scaled[key] = `${(num * factor).toFixed(4)}rem`;
    } else if (Array.isArray(val) && typeof val[0] === 'string' && val[0].endsWith('rem')) {
      // handle fontSize: ['1rem', { lineHeight: '1.5rem' }]
      const num = parseFloat(val[0]);
      const scaledLineHeight = val[1]?.lineHeight
        ? `${(parseFloat(val[1].lineHeight) * factor).toFixed(4)}rem`
        : undefined;

      scaled[key] = [
        `${(num * factor).toFixed(4)}rem`,
        scaledLineHeight ? { lineHeight: scaledLineHeight } : undefined,
      ];
    } else {
      scaled[key] = val; // leave non-rem values as-is
    }
  }
  return scaled;
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: scaleRemValues(fontSize, 0.8),
      spacing: scaleRemValues(spacing, 0.8),      
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
      },
      boxShadow: {
        'custom-light': '6px 6px 15px rgba(185,185,185,0.9)',
        'custom-medium': '15px 15px 38px rgba(209,213,215,0.9)',
        'custom-heavy': '0px 4px 12px rgba(136,136,136,1)',
        'custom-blue': '0px 16px 26px rgba(71,186,255,0.3)',
      },
    },
  },
  plugins: [],
};