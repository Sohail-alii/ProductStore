import { SignInButton } from "@clerk/clerk-react";
import { Route, Router, Routes } from "react-router";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAuthReq from "./hooks/useAuthReq.js";
import useUserSync from "./hooks/useUserSync.js";

function App() {
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync(isSignedIn);
  if (!isClerkLoaded)  return null;
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />


        </Routes>

      </main>
      
    </div>
  )
}

export default App
