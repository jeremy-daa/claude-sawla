import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Sawla Tours brand palette (Teff Gold + Volcanic Rock + Ivory) ──
        volcanic:    "#2a2724",
        ivory:       "#f8f6f1",
        gold:        "#c9941a",
        "gold-light": "#e8a82a",
        "gold-pale":  "#faeeda",
        "gold-faint": "#f7f0e3",
        "gold-ink":   "#906614",
        sand:        "#e8ddc7",
        warmgrey:    "#5c5a54",
        coffee:      "#6b4a2f",
        charcoal:    "#1c1c1a",
        // Aliases
        "teff-gold":  "#c9941a",
        "gold-100":   "#faeeda",
        "gold-200":   "#f5d89a",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem,8vw,7rem)",    { lineHeight:"1.0",  letterSpacing:"-0.03em",  fontWeight:"300" }],
        "display-xl":  ["clamp(3rem,6vw,5.5rem)",    { lineHeight:"1.04", letterSpacing:"-0.022em", fontWeight:"300" }],
        "display-lg":  ["clamp(2.25rem,4vw,3.75rem)",{ lineHeight:"1.08", letterSpacing:"-0.016em", fontWeight:"300" }],
        "display-md":  ["clamp(1.75rem,3vw,2.75rem)",{ lineHeight:"1.12", letterSpacing:"-0.012em" }],
        "display-sm":  ["clamp(1.375rem,2vw,1.875rem)",{ lineHeight:"1.2" }],
        "body-lg":     ["1.125rem", { lineHeight:"1.8" }],
        "body-md":     ["1rem",     { lineHeight:"1.78" }],
        "body-sm":     ["0.875rem", { lineHeight:"1.65" }],
        "label":       ["0.6875rem", { lineHeight:"1", letterSpacing:"0.14em", fontWeight:"500" }],
      },
      spacing: {
        section:       "8rem",
        "section-sm":   "5rem",
        "section-xs":   "3.5rem",
        container:     "1320px",
        18:            "4.5rem",
      },
      maxWidth: { container:"1320px", prose:"68ch", wide:"1440px" },
      borderRadius: { card:"16px", pill:"100px", xs:"4px" },
      transitionTimingFunction: {
        sawla:  "cubic-bezier(0.25,0.46,0.45,0.94)",
        luxury: "cubic-bezier(0.16,1,0.3,1)",
        out:    "cubic-bezier(0.0,0.0,0.2,1)",
      },
      transitionDuration: { "350":"350ms","400":"400ms","500":"500ms","600":"600ms","700":"700ms","800":"800ms" },
      keyframes: {
        fadeUp:    { from:{opacity:"0",transform:"translateY(28px)"}, to:{opacity:"1",transform:"translateY(0)"} },
        fadeIn:    { from:{opacity:"0"}, to:{opacity:"1"} },
        slideDown: { "0%":{transform:"translateY(-100%)"}, "100%":{transform:"translateY(200%)"} },
        shimmer:   { "0%":{backgroundPosition:"200% center"}, "100%":{backgroundPosition:"-200% center"} },
      },
      animation: {
        "fade-up":  "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":  "fadeIn 0.5s ease forwards",
        "shimmer":  "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
}
export default config