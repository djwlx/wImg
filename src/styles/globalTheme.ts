const globalTheme = {
  styles: {
    global: ({ colorMode }: { colorMode: "light" | "dark" }) => ({
      "html, body": {
        bg: colorMode === "light" ? "#f7f8fa" : undefined,
      },
    }),
  },
};
export default globalTheme;
