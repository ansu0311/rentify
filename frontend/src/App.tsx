import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Home from "./Pages/Home";
import Listing from "./Pages/Listing";

// Wrapped your application with BrowserRouter to enable routing
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Define routes for your pages */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/listing" element={<Listing />} />

          {/* Catch-all route for unmatched paths, redirecting to home */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;