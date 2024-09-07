import styles from "./cards.module.css";
import { CardProp } from "./cards";
import DomPurify from "dompurify";

function Description(props: { description: React.ReactNode | string }) {
  const { description } = props;
  if (typeof props.description === "string") {
    const descriptionString = props.description;
    const sanitizedHtml = DomPurify.sanitize(descriptionString);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }
  return <>{description}</>;
}

export default function Card({
  title,
  description,
  author,
  shouldRender,
}: CardProp) {
  if (shouldRender && !shouldRender()) {
    return null;
  }
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
