export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', "ui-serif", "Georgia", "serif"],
        sans: ['"Sora"', "ui-sans-serif", "system-ui"]
      },
      colors: {
        ink: "#1F2429",
        paper: "#F7F4EF",
        card: "#FFFBF6",
        border: "#E6DED4",
        muted: "#5E666D",
        primary: "#20354A",
        secondary: "#EFE7DD",
        accent: "#C48A5A",
        info: "#2B5D7B",
        warning: "#B15B2A",
        success: "#1F7A5B",
        error: "#9D2B2B",
        "info-soft": "#EEF6FB",
        "warning-soft": "#FFF6ED",
        "success-soft": "#F7F4EF",
        "error-soft": "#FFF1F1"
      },
      boxShadow: {
        glass: "0 24px 60px rgba(32, 40, 48, 0.18)",
        soft: "0 18px 36px rgba(32, 40, 48, 0.12)"
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px"
      }
    }
  },
  plugins: []
};
