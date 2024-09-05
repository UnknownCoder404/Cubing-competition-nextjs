import Link from "next/link";
import styles from "./cards.module.css";

type Props = {
  title: string;
  description: React.ReactNode | string;
  author?: {
    name: string;
  };
};

function Description(props: { description: React.ReactNode | string }) {
  const { description } = props;
  if (typeof props.description === "string") {
    return <p>{description}</p>;
  }
  return <>{description}</>;
}

function Card(props: Props) {
  const { title, description, author } = props;
  return (
    <div className={styles.card}>
      {" "}
      {/* Use styles.card instead of "card" */}
      <div className={styles["card-inside-container"]}>
        {" "}
        {/* For kebab-case class names */}
        <div className={styles["post-title-container"]}>
          <h2 className={styles["post-title"]}>{title}</h2>
        </div>
        <div className={styles["post-description-container"]}>
          <Description description={description} />
        </div>
        {author && (
          <div className={styles["post-author-container"]}>
            <p className={styles["post-author-p"]}>
              Objavio
              <span className={styles["post-author"]}>{author.name}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Cards() {
  const cards = [
    {
      title: "Natjecanja",
      description: (
        <p>
          Listu natjecanja i rezultate možete pronaći{" "}
          <Link href="/Competitions">ovdje</Link>.
        </p>
      ),
    },
    {
      title: "Pravila",
      description: (
        <p>
          Službena pravila natjecanja možete pronaći{" "}
          <Link href="/Rules">ovdje</Link>.
        </p>
      ),
    },
    {
      title: "Vježbanje",
      description: (
        <p>
          Ponavljanje je majka znanja! Vježbaj i ti{" "}
          <Link href="/Scramble">ovdje</Link>.
        </p>
      ),
    },
    {
      title: "Dijeljenje",
      description: <p>Pozovi svoje prijatelje</p>,
    },
  ];
  return (
    <div className={styles["cards"]}>
      {cards.map((card, index) => {
        return <Card key={index} {...card} />;
      })}
    </div>
  );
}
