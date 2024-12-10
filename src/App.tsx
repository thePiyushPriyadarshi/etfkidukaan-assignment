import { Route, Routes } from "react-router";
import { Navbar } from "./components/navbar";
import EmployeeListPage from "./pages/EmployeeListPage";
import AddNewEmployeePage from "./pages/AddNewEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/protected-route";
import AdminRoute from "./components/admin-route";
import OpenRoute from "./components/open-route";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/employees/add" element={<AddNewEmployeePage />} />
          <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
          <Route path="/employees/:id/edit" element={<EditEmployeePage />} />
        </Route>
        <Route element={<OpenRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
