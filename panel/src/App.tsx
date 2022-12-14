import "@assets/css/App.scss";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "@pages/Login";
import Dashboard from "@pages/Dashboard";
import Questions from "@pages/Questions";
import Lessons from "@pages/Lessons";
import Users from "@pages/Users";

// Components
import Header from "@components/Header";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";

// Contexts
import { MainProvider } from "@context/main";
import { NavigationProvider } from "@context/navigation";
import { SnapshotsProvider } from "@context/snapshots";
import { QuestionsProvider } from "@context/questions";
import { LessonsProvider } from "@context/lessons";
import { UsersProvider } from "@context/users";

function App() {
  return (
    <div className="App flex flex-row justify-between relative">
      <BrowserRouter>
        <MainProvider>
          <NavigationProvider>
            <SnapshotsProvider>
              <Header />
              <Navbar />
              <QuestionsProvider>
                <LessonsProvider>
                  <UsersProvider>
                    <Routes>
                      <Route path="/" element={<Dashboard />}></Route>
                      <Route path="/questions" element={<Questions />}></Route>
                      <Route path="/lessons" element={<Lessons />}></Route>
                      <Route path="/users" element={<Users />}></Route>
                      <Route path="/login" element={<Login />}></Route>
                    </Routes>
                  </UsersProvider>
                </LessonsProvider>
              </QuestionsProvider>
              <Sidebar />
            </SnapshotsProvider>
          </NavigationProvider>
        </MainProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
