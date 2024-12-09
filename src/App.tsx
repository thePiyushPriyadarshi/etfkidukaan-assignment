import { Route, Routes } from "react-router";
import { Navbar } from "./components/navbar";
import EmployeeListPage from "./pages/EmployeeListPage";
import AddNewEmployeePage from "./pages/AddNewEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/employees" element={<EmployeeListPage />} />
        <Route path="/employees/add" element={<AddNewEmployeePage />} />
        <Route path="/employees/:id" element={<EmployeeDetailsPage />} />
        <Route path="/employees/:id/edit" element={<EditEmployeePage />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </div>
  );
}

export default App;
