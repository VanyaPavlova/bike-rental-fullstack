import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AppBar } from "./components/shared/AppBar";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Manager } from "./pages/Manager";
import { Bikes } from "./pages/Bikes";
import { UserContext } from "./context/UserContext";
import { initializeParse } from "./services/back4app/Connection.js";
import { UserService } from "./services/back4app/UserService";
import { useNavigate, useHref } from "react-router-dom";
import { addSampleUsers } from "./services/back4app/UserService";

const userService = new UserService(initializeParse());

function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  const href = useHref();

  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = userService.currentUser;
    setCurrentUser(user);
    if (user && (href === "/" || href === "/login" || href === "/register")) {
      navigate("/bikes");
    }

    addSampleUsers(userService);
  }, []);

  return (
    <UserContext.Provider value={{ userService, currentUser, setCurrentUser }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main className="app">
            <section className="content">
              <AppBar />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/manager" element={<Manager />} />
                <Route path="/bikes" element={<Bikes />} />
              </Routes>
            </section>
          </main>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
