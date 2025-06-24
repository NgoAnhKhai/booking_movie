import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import ThemeProvider from "./context/UseTheme";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
