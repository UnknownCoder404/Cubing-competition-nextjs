"use client";

import styles from "./cards.module.css";
import Card from "./card";

export type CardProp = {
  title: string;
  description: React.ReactNode | string;
  author?: {
    username: string;
  };
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

type CardsProps = { cards: CardProp[]; posts: PostProp[] };

function Cards({ cards, posts }: CardsProps) {
  return (
    <div className={styles["cards"]}>
      {cards.map((card, index) => {
        return <Card key={`card-${index}`} {...card}></Card>;
      })}
      {posts.map((post) => {
        return <Card key={post.id} {...post}></Card>;
      })}
    </div>
  );
}

export default Cards;
