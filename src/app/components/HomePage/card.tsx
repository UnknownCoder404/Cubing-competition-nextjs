import styles from "./cards.module.css";
import { CardProp } from "../../Types/cards";
import DomPurify from "dompurify";
import { useState, useEffect } from "react";

function Description({
    description,
    type,
}: {
    description: React.ReactNode | string;
    type: "post" | "card";
}) {
    const [showMore, setShowMore] = useState(false);
    const [truncatedDescription, setTruncatedDescription] = useState("");
    const maxLength = 200; // Set maximum length before "show more" appears

    useEffect(() => {
        if (type === "post" && typeof description === "string") {
            const sanitizedDescription = DomPurify.sanitize(description);
            if (sanitizedDescription.length > maxLength) {
                setTruncatedDescription(
                    sanitizedDescription.substring(0, maxLength) + "...",
                );
            } else {
                setTruncatedDescription(sanitizedDescription);
            }
        }
    }, [description, type]);

    if (typeof description === "string") {
        const sanitizedDescription = DomPurify.sanitize(description);

        if (type === "post") {
            return (
                <div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: showMore
                                ? sanitizedDescription
                                : truncatedDescription,
                        }}
                    />
                    {sanitizedDescription.length > maxLength && (
                        <button
                            className={styles.showMoreButton}
                            onClick={() => setShowMore(!showMore)}
                        >
                            {showMore ? "Prikaži manje" : "Prikaži više"}
                        </button>
                    )}
                </div>
            );
        } else {
            return (
                <div
                    dangerouslySetInnerHTML={{
                        __html: sanitizedDescription,
                    }}
                />
            );
        }
    }
    return <>{description}</>;
}

export default function Card({
    title,
    description,
    author,
    shouldRender,
    loggedIn,
    type,
}: CardProp) {
    const [shouldCardRender, setShouldCardRender] = useState(false);

    useEffect(() => {
        setShouldCardRender(shouldRender ? shouldRender(loggedIn) : true);
    }, [shouldRender, loggedIn]);

    if (!shouldCardRender) return null;

    return (
        <article className={styles.card} role="article">
            <div className={styles["card-inside-container"]}>
                <header className={styles["post-title-container"]}>
                    <h2 className={styles["post-title"]} aria-label={title}>
                        {title}
                    </h2>
                </header>
                <div
                    className={styles["post-description-container"]}
                    aria-label="Post Description"
                >
                    <Description description={description} type={type} />
                </div>
                {author && (
                    <footer className={styles["post-author-container"]}>
                        <p className={styles["post-author-p"]}>
                            <span aria-label="Posted by">Objavio</span>{" "}
                            <span
                                className={styles["post-author"]}
                                aria-label={author.username}
                            >
                                {author.username}
                            </span>
                        </p>
                    </footer>
                )}
            </div>
        </article>
    );
}
