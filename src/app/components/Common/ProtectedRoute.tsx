"use client";
import { getRole, isAdmin, tokenValid } from "@/app/utils/credentials";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    redirectTo?: string; // Optional for non-redirect behavior
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
    const [isAuthorized, setIsAuthorized] = useState(false);
    const role = getRole();

    if (require === "loggedout" && validateToken) {
        throw new Error(
            "Invalid use of ProtectedRoute: Cannot validate token for logged out users",
        );
    }
    async function handleValidation() {
        // Offline validation
        if (
            (require === "loggedin" && !role) ||
            (require === "admin" && (!role || !isAdmin(role))) ||
            (require === "loggedout" && role)
        ) {
            if (redirectTo) {
                router.push(redirectTo); // Redirect if specified
            }
            return;
        }

        // Async token validation
        if (validateToken) {
            const tokenIsValid = await tokenValid();
            if (!tokenIsValid) {
                if (redirectTo) {
                    router.push(redirectTo);
                }
                return;
            }
        }

        setIsAuthorized(true); // Authorize if all checks pass
    }

    useEffect(() => {
        handleValidation();
    }, [redirectTo, require, validateToken, role]);

    if (!isAuthorized && !redirectTo) {
        return null; // Hide protected content without redirecting
    }

    if (!isAuthorized) {
        return null; // Render nothing while validation is in progress
    }

    return children; // Render protected content
}
