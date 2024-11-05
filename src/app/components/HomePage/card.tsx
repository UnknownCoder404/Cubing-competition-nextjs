import styles from "./cards.module.css";
import { CardProp } from "./cards";
import DomPurify from "dompurify";
import { useState, useEffect } from "react";

function Description({
    description,
}: {
    description: React.ReactNode | string;
}) {
    if (typeof description === "string") {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: DomPurify.sanitize(description),
                }}
            />
        );
    }
    return <>{description}</>;
}

export default function Card({
    title,
    description,
    author,
    shouldRender,
    loggedIn,
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
                    <Description description={description} />
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
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: title,
                    author: {
                        "@type": "Person",
                        name: author?.username,
                    },
                    description:
                        typeof description === "string"
                            ? description
                            : undefined,
                })}
            </script>
        </article>
    );
}
