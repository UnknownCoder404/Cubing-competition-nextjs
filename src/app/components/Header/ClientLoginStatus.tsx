"use client"; // This makes this component a client-side component
import { useState, useEffect } from "react";
import Link from "next/link";
import headerStyles from "@/app/Header.module.css";

function ClientLoginStatus() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn");
    if (loggedInStatus) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      {loggedIn ? null : (
        <h2 className={headerStyles["log-in"]}>
          <Link href="Login/">Prijava</Link>
        </h2>
      )}
    </>
  );
}

export default ClientLoginStatus;
