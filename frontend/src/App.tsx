import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RegisterModal from "./components/ui/RegisterModal";
import LoginModal from "./components/ui/LoginModal";

// Layout wraps every page with Navbar + Footer
// Modals are managed here so Navbar can open them
const Layout: React.FC = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <Navbar
        onLoginClick={() => setLoginOpen(true)}
        onRegisterClick={() => setRegisterOpen(true)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              onRegisterClick={() => setRegisterOpen(true)}
              onLoginClick={() => setLoginOpen(true)}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={
            <Home
              onRegisterClick={() => setRegisterOpen(true)}
              onLoginClick={() => setLoginOpen(true)}
            />
          }
        />
      </Routes>

      <Footer />

      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={() => { setRegisterOpen(false); setLoginOpen(true); }}
      />
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => { setLoginOpen(false); setRegisterOpen(true); }}
      />
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Layout />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
