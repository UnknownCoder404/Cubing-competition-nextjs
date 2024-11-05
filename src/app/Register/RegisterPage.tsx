"use client";

import { FormEvent, useState } from "react";
import styles from "./Register.module.css";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [group, setGroup] = useState<number>(1); // Default group
    const [message, setMessage] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Basic validation
        if (!username || !password) {
            setMessage("Please fill in all fields.");
            return;
        }

        // Handle registration logic here
        setMessage("Registration successful!"); // Update this based on your logic
    };

    return (
        <form
            id="registerForm"
            onSubmit={handleSubmit}
            className={styles.registerForm}
        >
            <input
                type="text"
                id="username"
                name="username"
                placeholder="Korisničko ime"
                className={styles.usernameInput}
                autoCapitalize="words"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Lozinka"
                className={styles.passwordInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <br />
            <div className={styles.groupsContainer}>
                <div className={styles.groupContainer}>
                    <label htmlFor="group-1">Grupa 1</label>
                    <input
                        checked={group === 1}
                        type="radio"
                        id="group-1"
                        name="group"
                        className={styles.radioInput}
                        value="1"
                        onChange={(e) => setGroup(parseInt(e.target.value))}
                    />
                </div>
                <div className={styles.groupContainer}>
                    <label htmlFor="group-2">Grupa 2</label>
                    <input
                        checked={group === 2}
                        type="radio"
                        id="group-2"
                        name="group"
                        className={styles.radioInput}
                        value="2"
                        onChange={(e) => setGroup(parseInt(e.target.value))}
                    />
                </div>
            </div>
            <br />
            <button className={styles.submitBtn} type="submit">
                Registriraj
            </button>
            <div className={styles.messageContainer}>
                <p id="message">{message}</p>
            </div>
        </form>
    );
}
