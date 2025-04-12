import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDoList from "./components/ToDoList";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ToDoList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
