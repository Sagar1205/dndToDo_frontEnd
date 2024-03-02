import Home from "./components/Home";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <UserProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {/* <Home /> */}
                    <div
                      className="flex flex-col bg-gray-100 min-h-screen"
                      style={{
                        display: "inline-block",
                        minWidth: "100vw",
                        backgroundColor: "#F9F9F9",
                      }}
                    >
                      <div className="">
                        <Header />
                      </div>
                      <div className="">
                        <Home />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </UserProvider>
        </Router>
      </DndProvider>
    </>
  );
}
