import { ChakraProvider, Spinner, extendTheme } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import routers from "./routers";
import globalTheme from "@/styles/globalTheme";
import "@/styles/global.scss";

const App = () => {
  const router = createBrowserRouter(routers);
  const theme = extendTheme(globalTheme);

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} fallbackElement={<Spinner />} />
      </ChakraProvider>
    </RecoilRoot>
  );
};
export default App;
