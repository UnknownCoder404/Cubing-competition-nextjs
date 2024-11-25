"use client";

import { getRole, isAdmin, tokenValid } from "@/app/utils/credentials";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    redirectTo?: string; // Optional redirection URL
    require: "admin" | "loggedin" | "loggedout";
    validateToken?: boolean;
    children: React.ReactNode;
};

export default function ProtectedRoute({
    require,
    redirectTo,
    validateToken,
    children,
}: Props) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // null indicates "loading"

    useEffect(() => {
        const validateAccess = async () => {
            try {
                const role = getRole();

                if (validateToken) {
                    const tokenIsValid = await tokenValid();
                    if (!tokenIsValid) {
                        handleRedirect();
                        return;
                    }
                }

                if (
                    (require === "loggedin" && !role) ||
                    (require === "admin" && (!role || !isAdmin(role))) ||
                    (require === "loggedout" && role)
                ) {
                    handleRedirect();
                    return;
                }

                setIsAuthorized(true); // User is authorized
            } catch (error) {
                console.error("Error during validation:", error);
                handleRedirect(); // Redirect on error
            }
        };

        const handleRedirect = () => {
            if (redirectTo) {
                router.push(redirectTo);
            } else {
                setIsAuthorized(false); // Deny access without redirect
            }
        };

        validateAccess();
    }, [require, validateToken, redirectTo, router]);

    if (!isAuthorized) {
        return null; // Hide content for unauthorized users
    }

    return <>{children}</>; // Render protected content
}
