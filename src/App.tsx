import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import UsersTable from "./features/User/pages/UsersTable";
import EditUser from "./features/User/pages/EditUser";
import AddUser from "./features/User/pages/AddUser";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/users" element={<UsersTable />}></Route>
        <Route path="/edit/:id" element={<EditUser />}></Route>
        <Route exact path="/" element={<AddUser />}></Route>
      </Routes>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

export default App;
