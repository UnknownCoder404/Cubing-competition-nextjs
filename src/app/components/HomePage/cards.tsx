"use client";

import styles from "./cards.module.css";
import Card from "./card";
import Link from "next/link";
import handleInvite from "@/app/utils/handleInvite";
const cards: CardProp[] = [
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
    description: (
      <p>
        <span className={styles["share"]} onClick={handleInvite}>
          Pozovi
        </span>{" "}
        svoje prijatelje
      </p>
    ),
    shouldRender: () => {
      return !!window.navigator.share;
    },
  },
];

export type CardProp = {
  title: string;
  description: React.ReactNode | string;
  author?: {
    username: string;
  };
  shouldRender?: () => boolean;
};

export type PostProp = {
  id: string;
  title: string;
  description: React.ReactNode | string;
  author?: {
    username: string;
    id: string;
  };
  createdAt: Date;
};

type CardsProps = { posts: PostProp[] };

function Cards({ posts }: CardsProps) {
  return (
    <div className={styles["cards"]}>
      {cards.map((card, index) => {
        if (card.shouldRender && !card.shouldRender()) {
          return null;
        }
        return <Card key={`card-${index}`} {...card}></Card>;
      })}
      {posts.map((post) => {
        return <Card key={post.id} {...post}></Card>;
      })}
    </div>
  );
}

export default Cards;
