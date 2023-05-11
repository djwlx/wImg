import { ChakraProvider, Spinner, extendTheme } from "@chakra-ui/react";
import React, { createContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routers from "./routers";
import globalTheme from "@/styles/globalTheme";
import "@/styles/global.scss";

// 全局状态
const userInfo = {
  name: "小明",
  emial: "16102951127@qq.com",
};

export const StateContext = createContext({ userInfo });

const App = () => {
  const router = createBrowserRouter(routers);
  const theme = extendTheme(globalTheme);

  return (
    <StateContext.Provider value={{ userInfo }}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} fallbackElement={<Spinner />} />
      </ChakraProvider>
    </StateContext.Provider>
  );
};
export default App;
