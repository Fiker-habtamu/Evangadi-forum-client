import { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axiosInstance from "./axios/axiosConfig";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginForm from "./pages/LoginForm/LoginForm";
import RgisterForm from "./pages/RgisterForm/RgisterForm";
import AskQuestionPage from "./components/AskQestionPage/AskQuestionPage";
import AnswerPage from "./components/AnswerPage/AnswerPage";
// import { EditProvider } from "./context/EditContext";

const AuthWrapper = ({ setAuth }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  async function checkuser() {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axiosInstance.get("/users/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("User data:", data);
      setUser(data);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) navigate("/login");
    }
  }

  useEffect(() => {
    checkuser();
  }, []);

  return null; // No UI needed here
};
// const AuthWrapper = ({ setAuth }) => {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   async function checkUser() {
//     const token = localStorage.getItem("token");
//     try {
//       const { data } = await axiosInstance.get("/users/check", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setAuth((prevAuth) => {
//         if (!prevAuth) return true; // Only set true if it's not already true
//         return prevAuth;
//       });
//     } catch (err) {
//       console.log(err);
//       if (err.response?.status === 401) {
//         setAuth(false); // Set as not authenticated if unauthorized
//         navigate("/login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     checkUser();
//   }, []); // Empty dependency array to ensure it runs only once

//   return loading ? <div>Loading...</div> : null;
// };


// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates auth status is still being checked
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//     setLoading(false); // Stop loading once the token check is done
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Return loading UI while authentication is being checked
//   }

//   return (
//       <Router>
//         <Header />
//         {/* AuthWrapper handles token validation on page load */}
//         <AuthWrapper setAuth={setIsAuthenticated} />

//         <Routes>
//           {/* Public routes */}
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/register" element={<RgisterForm />} />

//           {/* Protected routes */}
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute isAuthenticated={isAuthenticated}>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/ask"
//             element={
//               <ProtectedRoute isAuthenticated={isAuthenticated}>
//                 <AskQuestionPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/answers/:question_id"
//             element={
//               <ProtectedRoute isAuthenticated={isAuthenticated}>
//                 <AnswerPage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//         <Footer />
//       </Router>

//   );

// }
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Stop loading once the check is done
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Ensure no routes are rendered until loading is complete
  }

  return (
      <Router>
        <Header />
        <AuthWrapper setAuth={setIsAuthenticated} />

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RgisterForm />} />

          <Route
            path="/"
            element={
                <Home />

            }
          />
          <Route
            path="/ask"
            element={
                <AskQuestionPage />

            }
          />
          <Route
            path="/answers/:question_id"
            element={
                <AnswerPage />
            }
          />
        </Routes>
        <Footer />
      </Router>

  );
}

export default App;