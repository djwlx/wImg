import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Spinner, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routers from "./layout/routers";

// 全局样式
const golbalTheme = {
  styles: {
    global: ({ colorMode }: { colorMode: "light" | "dark" }) => ({
      "html, body": {
        bg: colorMode === "light" ? "#f7f8fa" : undefined,
      },
    }),
  },
};
// 全局状态
const userInfo = {
  name: "小明",
  emial: "16102951127@qq.com",
};

export const StateContext = createContext({ userInfo });

function App() {
  const router = createBrowserRouter(routers);
  const theme = extendTheme(golbalTheme);

  return (
    <ChakraProvider theme={theme}>
      <StateContext.Provider value={{ userInfo }}>
        <RouterProvider router={router} fallbackElement={<Spinner />} />
      </StateContext.Provider>
    </ChakraProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
