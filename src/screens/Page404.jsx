import React from "react";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-10 flex-col min-h-screen min-w-screen items-center justify-center">
      <strong className="text-xl text-black">Page 404 Not Found</strong>
      <button type="button" onClick={() => navigate("/")} className="text-xl text-black border p-1 rounded">
        Go To Home
      </button>
    </div>
  );
}

export default Page404;
