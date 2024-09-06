"use client"; // This makes this component a client-side component
import { useState, useEffect } from "react";
import Link from "next/link";
import headerStyles from "./Header.module.css";

function ClientLoginStatus() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<null | string>(null);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn");
    const username = localStorage.getItem("username");

    setLoggedIn(!!loggedInStatus);
    setUsername(username);
  }, []);

  return (
    <>
      {loggedIn ? (
        <h2 className={headerStyles["log-in"]}>{username}</h2>
      ) : (
        <h2 className={headerStyles["log-in"]}>
          <Link href="Login/">Prijava</Link>
        </h2>
      )}
    </>
  );
}

export default ClientLoginStatus;
