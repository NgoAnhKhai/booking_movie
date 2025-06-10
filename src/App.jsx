import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ThemeProvider from "./context/UseTheme";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
