import { ThemeProvider } from "styled-components";
import { MyRoutes } from "./routes/routers";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useThemeStore } from "./store/ThemeStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  const { themeStyle } = useThemeStore();
  return (
    <ThemeProvider theme={themeStyle}>
    
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <MyRoutes />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      
    </ThemeProvider>
  );
}
export default App;
