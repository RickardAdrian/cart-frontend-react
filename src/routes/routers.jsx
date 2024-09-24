import { BrowserRouter, Routes, Route } from "react-router-dom";
import { POS } from "../pages/POS";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../hooks/ProtectedRoute";
import { Layout } from "../hooks/Layout";
import { CompletePayment } from "../components/organismos/CompletedPayment";
export function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute accessBy="authenticated">
              <Layout>
                <POS />
              </Layout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/pago/success"
          element={
            <ProtectedRoute accessBy="authenticated">
              <Layout>
                <CompletePayment />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
