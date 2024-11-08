// Server component
import { Metadata } from "next";
import RegisterPage from "./RegisterPage";

export const metadata: Metadata = {
    title: "Registracija - Cro Cube Comp",
    description: "Registracija korisnika za Cro Cube Comp natjecanja",
    keywords: ["Registracija", "Cro Cube Comp"],
};

export default function Register() {
    return <RegisterPage />;
}
