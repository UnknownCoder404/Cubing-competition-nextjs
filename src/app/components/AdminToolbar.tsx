"use client";
import { VercelToolbar } from "@vercel/toolbar/next";
import { getRole, isAdmin } from "../utils/credentials";

// Show the Vercel toolbar only for admin users
export function AdminToolbar() {
    const role = getRole();
    const isUserAdmin = role && isAdmin(role);
    return isUserAdmin ? <VercelToolbar /> : null;
}
