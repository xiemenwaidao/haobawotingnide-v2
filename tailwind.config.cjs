function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", "[data-theme='dark']"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    // Remove the following screen breakpoint or add other breakpoints
    // if one breakpoint is not enough for you
    screens: {
      sm: "640px",
    },

    extend: {
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
          inverted: withOpacity("--color-fill"),
          pre: "#eaedf3",
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          accent: withOpacity("--color-accent"),
          inverted: withOpacity("--color-text-base"),
          card: withOpacity("--color-card"),
          "card-muted": withOpacity("--color-card-muted"),
          "work-btn": withOpacity("--color-hongse"),
        },
      },
      outlineColor: {
        skin: {
          fill: withOpacity("--color-accent"),
        },
      },
      borderColor: {
        skin: {
          line: withOpacity("--color-border"),
          fill: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
        },
      },
      fill: {
        skin: {
          base: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
          yase: withOpacity("--color-yase"),
          hongse: withOpacity("--color-hongse"),
          titlelogo: withOpacity("--color-title-logo"),
        },
        transparent: "transparent",
      },
      stroke: {
        skin: {
          accent: withOpacity("--color-accent")
        }
      },
      fontFamily: {
        mono: ["Noto Sans JP", "monospace"],
        zh: ["ZCOOL XiaoWei", "sans-serif"],
      },
      textUnderlineOffset: {
        5: "5px",
    },
    boxShadow: {
        DEFAULT:
          "0 1px 3px 0 rgb(var(--color-shadow)), 0 1px 2px -1px rgb(var(--color-shadow))",
    },
    // https://tail-animista.vercel.app/play/text/focus-in/text-focus-in
    animation: {
      "text-focus-in":
          "text-focus-in 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both",
      marquee: "marquee 15s linear infinite;",
    },
    keyframes: {
      "text-focus-in": {
        "0%": {
          filter: "blur(12px)",
          opacity: "0",
        },
        to: {
          filter: "blur(0)",
          opacity: "1",
        },
      },
      marquee: {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(-100%)" },
      },
    },

      typography: {
        DEFAULT: {
          css: {
            pre: {
              color: false,
            },
            code: {
              color: false,
            },
            // marker系
            "ul > li::marker": {
              color: "rgb(var(--color-accent))",
            },
            "ol > li::marker": {
              color: "rgb(var(--color-accent))",
            },
            "summary::marker": {
              color: "rgb(var(--color-accent))",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
