"use client";
import styles from "./cards.module.css";
import Card from "./card";
import Link from "next/link";
import handleInvite from "@/app/utils/handleInvite";
import Image from "next/image";
import qrcode from "@/app/public/qrcode_to_website.webp";
import { getRole, isAdmin, loggedIn, logOut } from "@/app/utils/credentials";

const cardData: () => CardProp[] = () => [
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
      <>
        <p>
          <span className={styles.share} onClick={handleInvite}>
            Pozovi
          </span>{" "}
          svoje prijatelje
        </p>
        <Image
          src={qrcode}
          alt="qrcode to website"
          className={styles.qrcode}
          width={100}
          height={100}
        />
      </>
    ),
    shouldRender: () => !!window.navigator.share,
  },
  {
    title: "Odjava",
    description: (
      <p>
        Odjava je jednostavna! Kliknite na{" "}
        <span
          className={styles["logout-span"]}
          onClick={() => {
            logOut();
            window.location.reload(); // Refresh the page after logout
          }}
        >
          ovu poveznicu
        </span>{" "}
        da se odjavite.
      </p>
    ),
    shouldRender: (loggedIn?: boolean) => !!loggedIn,
  },
  {
    title: "Radna ploča",
    description: (
      <p>
        <Link href="/Dashboard">Ovdje</Link> možete pronaći radnu ploču.
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
        Ti si administrator! Oni mogu objaviti bilo što! Klikni{" "}
        <Link href="/posts">ovdje</Link>da objaviš nešto.
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
        Ti si administrator! Možeš{" "}
        <Link href="/competitions-dashboard">upravljati</Link> natjecanjima.
      </p>
    ),
    shouldRender: () => {
      const role = getRole();
      return !!role && isAdmin(role);
    },
  },
];

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
  createdAt: Date;
};

type CardsProps = { posts: PostProp[] };

function Cards({ posts }: CardsProps) {
  return (
    <div className={styles.cards}>
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
