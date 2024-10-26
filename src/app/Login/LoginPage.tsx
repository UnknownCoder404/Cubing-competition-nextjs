"use client";
// Header is hidden on this page
import loginStyles from "./Login.module.css";
import { url } from "@/globals";
import { Dispatch, SetStateAction, useState } from "react";
import { getRole, isAdmin, isUser, loggedIn } from "../utils/credentials";
import { ArrowLoader } from "../components/Loader/Loader";
// This function handles form submission and should be client-side
async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    setMsg: Dispatch<SetStateAction<string>>,
) {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget);
        const formUsername = formData.get("username");
        const formPassword = formData.get("password");

        const loginUrl = url;
        loginUrl.pathname = "/login";
        const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formUsername,
                password: formPassword,
            }),
        });
        const data = await response.json();
        if (response.status === 429) {
            setMsg(
                "Prekoračen je broj pokušaja.\nPokušajte ponovo za par minuta.",
            );
            return;
        }
        if (response.status === 401) {
            setMsg("Netočno korisničko ime ili lozinka.");
            return;
        }
        setMsg(data.message);
        const { id, token, username, role } = data.info;
        if (typeof window !== "undefined") {
            // This code works, however it throws error on server, so make sure window is defined.
            localStorage.setItem("id", id);
            localStorage.setItem("token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("role", role);
        }
    } catch (error) {
        setMsg(`Greška prilikom prijave.\n${error}`);
        console.error(error);
    }
}

// ErrorMessage component needs to be client-side because it handles dynamic content
function ErrorMessage({ message }: { message: string }) {
    return (
        <div id="message">
            <p>{message}</p>
        </div>
    );
}
function LoginButton({ loading }: { loading: boolean }) {
    return (
        <button className={loginStyles["submit-btn"]} type="submit">
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <ArrowLoader color="#000" />
                </div>
            ) : (
                "Prijava"
            )}
        </button>
    );
}
// LoginForm component handles user input and should be client-side
function LoginForm() {
    const [message, setMessage] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const role = getRole();
    if (loggedIn() && role && isUser(role)) {
        window.location.href = "/";
    }

    if (loggedIn() && role && isAdmin(role)) {
        window.location.href = "../Dashboard";
    }
    return (
        <form
            onSubmit={async (event) => {
                setLoading(true);
                await handleSubmit(event, setMessage);
                setLoading(false);
            }}
            id="login-form"
        >
            <input
                autoComplete="username"
                type="text"
                id="username"
                name="username"
                placeholder="Korisničko ime"
                className={loginStyles["username-input"]}
                autoFocus
            />
            <br />
            <input
                autoComplete="current-password"
                type="password"
                id="password"
                name="password"
                placeholder="Lozinka"
                className={loginStyles["password-input"]}
            />
            <br />
            <br />
            <LoginButton loading={isLoading} />
            <ErrorMessage message={message} />
        </form>
    );
}

// Main Login component can be server-side
export default function LoginPage() {
    return (
        <div className={loginStyles["form-container"]}>
            <LoginForm />
        </div>
    );
}
