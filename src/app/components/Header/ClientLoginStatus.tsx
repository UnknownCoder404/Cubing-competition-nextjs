"use client";

import Link from "next/link";
import headerStyles from "./Header.module.css";
import { getUsername, logOut } from "@/app/utils/credentials";
import accountCircle from "../../public/account_circle.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

function ClientLoginStatus() {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const loggedIn = !!username;

    useEffect(() => {
        const syncUsername = () => {
            setUsername(getUsername());
        };

        setUsername(getUsername());
        setLoaded(true);

        window.addEventListener("storage", syncUsername); // Listen for changes in storage
        return () => {
            window.removeEventListener("storage", syncUsername);
        };
    }, []);

    if (!loaded) {
        return <div className={headerStyles["account-container"]}></div>;
    }

    return (
        <header className={headerStyles["account-container"]}>
            <h2 className={headerStyles["log-in"]}>
                {username ? username : <Link href="/Login">Prijava</Link>}
            </h2>
            <Image
                alt={loggedIn ? "User account options" : "Account login"}
                className={clsx(headerStyles["account-circle"], {
                    [headerStyles["logged-in"]]: loggedIn,
                })}
                src={accountCircle}
                width={24}
                height={24}
                onClick={() => {
                    if (loggedIn) {
                        logOut();
                        setUsername(null);
                        router.refresh();
                    }
                }}
                priority={true}
                role="button"
                tabIndex={0}
            />
        </header>
    );
}

export default ClientLoginStatus;
