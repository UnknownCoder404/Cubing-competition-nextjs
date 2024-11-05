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
        setUsername(getUsername());
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <div className={headerStyles["account-container"]}></div>; // TODO: Add loading text, kind of like on youtube
    }

    return (
        <header className={headerStyles["account-container"]}>
            <h2 className={headerStyles["log-in"]}>
                {username ? username : <Link href="/Login">Log In</Link>}
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
                        router.refresh();
                        setUsername(null);
                    }
                }}
                priority={true}
                role="button" // Indicates the image is clickable
                tabIndex={0} // Allows keyboard navigation
            />
        </header>
    );
}

export default ClientLoginStatus;
