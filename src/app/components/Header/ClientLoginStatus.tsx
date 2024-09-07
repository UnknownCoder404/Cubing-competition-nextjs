"use client"; // This makes this component a client-side component
import { useState, useEffect } from "react";
import Link from "next/link";
import headerStyles from "./Header.module.css";
import { loggedIn, logOut } from "@/app/utils/credentials";
import accountCircle from "../../public/account_circle.svg";
import Image from "next/image";

function ClientLoginStatus() {
  const [username, setUsername] = useState<null | string>(null);
  const [isloggedIn, setLoggedInStatus] = useState<boolean>(false);
  useEffect(() => {
    const loggedInStatus = loggedIn();
    const username = localStorage.getItem("username");

    setLoggedInStatus(!!loggedInStatus);
    setUsername(username);
  }, []);

  return (
    <>
      {isloggedIn ? (
        <h2 className={headerStyles["log-in"]}>{username}</h2>
      ) : (
        <h2 className={headerStyles["log-in"]}>
          <Link href="Login/">Prijava</Link>
        </h2>
      )}

      <Image
        alt="account circle"
        className={headerStyles["account-circle"]}
        src={accountCircle}
        width={24}
        height={24}
        onClick={() => {
          if (isloggedIn) {
            logOut();
            setLoggedInStatus(false);
          }
        }}
      />
    </>
  );
}

export default ClientLoginStatus;
