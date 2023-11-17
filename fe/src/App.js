import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import UserPage from "./pages/authorPage/UserPage";
import CreatorPage from "./pages/creatorPage/CreatorPage";
import NewPost from "./pages/newPost/NewPost";
import GlobalContext from "./context/getContext";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/creatorpage/:id" element={<CreatorPage />} />
            <Route path="/newpost" element={<NewPost />} />
          </Route>
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  );
};

export default App;
