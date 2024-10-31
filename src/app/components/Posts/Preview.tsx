"use client";
import { useEffect, useMemo, useState } from "react";
import { markdownToHtml } from "@/app/utils/markdown";
import styles from "../../Posts/Preview.module.css";

type Props = {
    description?: string;
    title?: string;
};

type CardProp = {
    title: string;
    descriptionHtml: string;
    authorUsername: string | null;
};

function Card({ title, descriptionHtml, authorUsername }: CardProp) {
    return (
        <div className={styles.card}>
            <div className={styles["card-inside-container"]}>
                <div className={styles["post-title-container"]}>
                    <h2 className={styles["post-title"]}>{title}</h2>
                </div>
                <div
                    className={styles["post-description-container"]}
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />

                {authorUsername && (
                    <div className={styles["post-author-container"]}>
                        <p className={styles["post-author-p"]}>
                            Objavio{" "}
                            <span className={styles["post-author"]}>
                                {authorUsername}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Preview({ description, title }: Props) {
    const [authorUsername, setAuthorUsername] = useState<string | null>(null);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setAuthorUsername(username);
        }
    }, []);

    const descriptionHtml = useMemo(
        () => markdownToHtml(description || "Ovo je pretpregled."),
        [description],
    );

    return (
        <Card
            title={title || "Pretpregled"}
            descriptionHtml={descriptionHtml}
            authorUsername={authorUsername}
        />
    );
}
