import { Metadata } from "next";
import LoginPage from "./LoginPage";
import ProtectedRoute from "../components/Common/ProtectedRoute";

export const dynamic = "error";

export const metadata: Metadata = {
    title: "Prijava - Cro Cube Comp",
    description: "Prijava na Cro Cube Comp račun",
    keywords: ["Prijava", "Cro Cube Comp"],
};

export default function Login() {
    return (
        <ProtectedRoute require="loggedout" redirectTo="/" validateToken>
            <LoginPage />
        </ProtectedRoute>
    );
}
