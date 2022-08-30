import Home from "../Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "../models/user/UserStore";
import StandardPage from "../StandardPage/StandardPage";
import { FormsViewer } from "../forms/FormsViewer";
import { MOCK_FORMS } from "@general-vms/shared";
import { Authenticator } from "@aws-amplify/ui-react";
import "../amplify/configure";
import { AuthRoute } from "./auth-route/AuthRoute";
import { ALL_ROLES } from "src/models/user/User";

function Private() {
  return <p>Private!</p>;
}

function App() {
  return (
    <UserProvider>
      <Authenticator.Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StandardPage component={<Home />} />} />
            <Route
              path="/forms"
              element={<StandardPage component={<FormsViewer forms={MOCK_FORMS} />} />}
            />
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route
              path="/tester"
              element={
                <AuthRoute allowedRoles={ALL_ROLES}>
                  <Private />
                </AuthRoute>
              }
            />
            <Route path="*" element={<p>404</p>} />
          </Routes>
        </BrowserRouter>
      </Authenticator.Provider>
    </UserProvider>
  );
}

export default App;
