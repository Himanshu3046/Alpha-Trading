import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../landing_page/context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; // user icon

function Navbar() {
  const { user, logout } = useAuth();

  const handleDashboardRedirect = () => {
    if (!user) return alert("Please login first!");
    window.location.href = `http://localhost:3001?user=${encodeURIComponent(JSON.stringify(user))}`;
    // Option 1: Save user in localStorage (the dashboard can read it)
    localStorage.setItem("dashboardUser", JSON.stringify(user));

    // Option 2 (optional): Append data as query params (less secure)
    // const query = new URLSearchParams({
    //   name: user.name,
    //   email: user.email
    // }).toString();

    // Redirect to dashboard
    window.open("http://localhost:3001", "_blank"); // open in new tab
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Rsr5tVW-fKYkygW4SdSuRtXK-ui5ZyKOXQ&s"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-lg-0">
            {user ? (
              <>
                {/* Greeting */}
                <li className="nav-item d-flex align-items-center me-2">
                  <span className="nav-link active">
                    👋 Hi, {user.name || "User"}
                  </span>
                </li>

                {/* Dashboard Icon */}
                <li className="nav-item d-flex align-items-center me-2">
                  <button
                    onClick={handleDashboardRedirect}
                    className="btn nav-link active"
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "1.3rem",
                    }}
                    title="Go to Dashboard"
                  >
                    <FaUserCircle />
                  </button>
                </li>

                {/* Logout Button */}
                <li className="nav-item">
                  <button
                    className="btn nav-link active"
                    style={{ border: "none", background: "transparent" }}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/signin">
                    Signin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}

            {/* Static Links */}
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/product">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/support">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
