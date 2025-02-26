"use client";

import styles from "./Cards.module.css";
import Card from "./Card";
import { loggedIn } from "@/app/utils/credentials";
import { staticCards } from "./staticCards";

export type PostProp = {
    id: string;
    title: string;
    description: React.ReactNode | string;
    author?: {
        username: string;
        id: string;
    };
    createdAt: string;
};

type CardsProps = { posts: PostProp[] };

function Cards({ posts }: CardsProps) {
    return (
        <main className={styles.cards} suppressHydrationWarning>
            {staticCards().map((card, index) => (
                <Card key={`card-${index}`} {...card} loggedIn={loggedIn()} />
            ))}
            {posts.map((post) => (
                <Card key={post.id} {...post} isPost={true} />
            ))}
        </main>
    );
}

export default Cards;
