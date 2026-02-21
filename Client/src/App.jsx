import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContexts";
import Layout from "./Components/Layout";
import Settings from "./Pages/Settings";
import QRCodePage from "./Pages/QRCodepage";
import Dashboard from "./Pages/DashBoard";
import ProtectedRoute from "./Contexts/ProtectedRouter";
import Login from "./Auth/Login";
import Register from "./Auth/Register"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()


function App() {
  return (
        <QueryClientProvider client={queryClient}>

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<QRCodePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* protected */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
           <Route
              path="users"
              element={
                <>
                  <h1>Users Page</h1>
                  <p>This page is under development.</p>
                </>
              }
            />

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
