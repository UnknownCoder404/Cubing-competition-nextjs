"use client";

import styles from "./cards.module.css";
import Card from "./card";
import Link from "next/link";
import handleInvite from "@/app/utils/handleInvite";
import Image from "next/image";
import qrcode from "@/app/public/qrcode_to_website.webp";
import {
    getRole,
    getUsername,
    isAdmin,
    loggedIn,
    logOut,
} from "@/app/utils/credentials";

export type CardProp = {
    title: string;
    description: React.ReactNode | string;
    author?: {
        username: string;
    };
    shouldRender?: (loggedIn?: boolean) => boolean;
    loggedIn?: boolean;
};

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

const cardData: () => CardProp[] = () => [
    {
        title: "Natjecanja",
        description: (
            <p>
                Pogledajte{" "}
                <Link href="/Competitions">listu natjecanja i rezultate</Link>.
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
            <>
                <p>
                    <span
                        className={styles.share}
                        onClick={handleInvite}
                        role="button"
                        aria-label="Pozovi prijatelje"
                    >
                        Pozovi
                    </span>{" "}
                    svoje prijatelje
                </p>
                <Image
                    src={qrcode}
                    alt="QR kod za pristup stranici"
                    className={styles.qrcode}
                    width={100}
                    height={100}
                    placeholder="blur"
                />
            </>
        ),
        shouldRender: () =>
            typeof window !== "undefined" && !!window.navigator.share,
    },
    {
        title: "Odjava",
        description: (
            <p>
                Odjava je jednostavna! Ako se želite odjaviti iz korisničkog
                računa {getUsername()} kliknite na{" "}
                <span
                    className={styles["logout-span"]}
                    onClick={() => {
                        logOut();
                        window.location.reload(); // Refresh the page after logout
                    }}
                    role="button"
                    aria-label="Odjavite se"
                >
                    ovu poveznicu
                </span>
                .
            </p>
        ),
        shouldRender: (loggedIn?: boolean) => !!loggedIn,
    },
    {
        title: "Radna ploča",
        description: (
            <p>
                Pristupite <Link href="/Dashboard">radnoj ploči ovdje</Link>.
            </p>
        ),
        shouldRender: () => {
            const role = getRole();
            return !!role && isAdmin(role);
        },
    },
    {
        title: "Objava",
        description: (
            <p>
                Kao administrator možete objaviti sadržaj. Kliknite{" "}
                <Link href="/Posts">ovdje za objavu</Link>.
            </p>
        ),
        shouldRender: () => {
            const role = getRole();
            return !!role && isAdmin(role);
        },
    },
    {
        title: "Natjecanja",
        description: (
            <p>
                Kao administrator možete{" "}
                <Link href="/Competitions-Dashboard">
                    upravljati natjecanjima
                </Link>
                .
            </p>
        ),
        shouldRender: () => {
            const role = getRole();
            return !!role && isAdmin(role);
        },
    },
];

type CardsProps = { posts: PostProp[] };

function Cards({ posts }: CardsProps) {
    return (
        <div className={styles.cards} suppressHydrationWarning>
            {cardData().map((card, index) => (
                <Card key={`card-${index}`} {...card} loggedIn={loggedIn()} />
            ))}
            {posts.map((post) => (
                <Card key={post.id} {...post} />
            ))}
        </div>
    );
}

export default Cards;
