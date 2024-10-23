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
        dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(description) }}
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
    <div className={styles.card}>
      <div className={styles["card-inside-container"]}>
        <div className={styles["post-title-container"]}>
          <h2 className={styles["post-title"]}>{title}</h2>
        </div>
        <div className={styles["post-description-container"]}>
          <Description description={description} />
        </div>
        {author && (
          <div className={styles["post-author-container"]}>
            <p className={styles["post-author-p"]}>
              Objavio{" "}
              <span className={styles["post-author"]}>{author.username}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
