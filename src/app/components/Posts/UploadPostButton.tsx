"use client";
import styles from "../../Posts/Posts.module.css";

type Props = {
    title: string;
    description: string;
};
export default function UploadPostButton({ title, description }: Props) {
    return <button className={styles["post-btn"]}>Objavi</button>;
}
