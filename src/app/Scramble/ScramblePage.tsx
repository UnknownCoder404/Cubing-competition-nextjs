"use client";

import { useState, useEffect } from "react";
import getScramble from "./getScramble";
import styles from "./Scramble.module.css";
import { Loader } from "../components/Loader/Loader";
import dynamic from "next/dynamic";

const ScrambleDisplay = dynamic(
    () => import("../components/Scramble/ScrambleDisplay"),
    {
        loading: () => <LoadingScrambleDisplay />,
        ssr: false,
    },
);

function LoadingScrambleDisplay() {
    return (
        <div className={styles["scramble-display-container"]}>
            <Loader />
        </div>
    );
}

function handleScrambleShare(scramble: string) {
    const url = window.location.href;
    if (!navigator.share) {
        alert("Ovaj preglednik ne podržava dijeljenje.");
        return;
    }
    navigator.share({
        title: "",
        text: `Složio sam Rubikovu kocku za scramble-om: ${scramble}. Pokušaj i ti! ${
            url || ""
        }`,
    });
}

function generateNewScramble(setScramble: (scramble: string) => void) {
    setScramble(getScramble());
}

export default function ScramblePage() {
    const [scramble, setScramble] = useState<string>("");

    useEffect(() => {
        setScramble(getScramble());
    }, []);

    return (
        <main className={styles["main"]}>
            <p className={styles["scramble"]}>{scramble}</p>
            <div className={styles["scramble-controls"]}>
                <ScrambleDisplay
                    scramble={scramble}
                    event="333"
                    visualization="2D"
                    containerClassName={styles["scramble-display-container"]}
                    onClick={() => handleScrambleShare(scramble)}
                />
                <div className={styles["btn-rescramble-container"]}>
                    <button
                        className={styles["btn-rescramble"]}
                        onClick={() => generateNewScramble(setScramble)}
                    >
                        Promiješaj
                    </button>
                </div>
            </div>
        </main>
    );
}
