"use client";

import { getRole, isAdmin, tokenValid } from "@/app/utils/credentials";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
    redirectTo: string;
    require: "admin" | "loggedin" | "loggedout";
    validateToken?: boolean;
};

export default function ProtectedRoute({
    require,
    redirectTo,
    validateToken,
}: Props) {
    const router = useRouter();
    const role = getRole();

    function offlineValidation() {
        if (require === "loggedin" && !role) return false;
        if (require === "admin" && (!role || !isAdmin(role))) return false;
        if (require === "loggedout" && role) return false;
        return true;
    }

    async function handleValidation() {
        if (!offlineValidation()) {
            router.push(redirectTo);
            return;
        }

        if (validateToken) {
            const tokenIsValid = await tokenValid();
            if (!tokenIsValid) {
                router.push(redirectTo);
            }
        }
    }

    useEffect(() => {
        handleValidation();
    }, [redirectTo, require, validateToken, role]);

    return null;
}
