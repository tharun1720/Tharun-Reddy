import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth_route } from "../../constants/routes";

function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="p-4 bg-blue-500 text-white">
      <div className="flex justify-between">
        {isAuthenticated ? (
          <>
            <Link
              onClick={() => Dispatch(logout())}
              className="hover:underline"
            >
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to={auth_route.login} className="hover:underline">
              Login
            </Link>
            <Link to={auth_route.signUp} className="hover:underline">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
