import Image from "next/image";
import { Posts, Post as PostType } from "../Types/posts";
import styles from "./Posts.module.css";
import deleteIcon from "@/app/public/delete.svg";
import editIcon from "@/app/public/edit.svg";
import { deletePost } from "../utils/posts";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
type Props = {
    posts: Posts;
};
function EditPostModal({
    post,
    isShown,
    onClose,
}: {
    post: PostType;
    isShown: boolean;
    onClose: () => void;
}) {
    const editPostModalRef = useRef<HTMLDialogElement>(null);
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);

    // Sync title and description with post prop changes
    useEffect(() => {
        setTitle(post.title);
        setDescription(post.description);
    }, [post]);

    // Handle modal open/close based on isShown
    useEffect(() => {
        if (!editPostModalRef.current) return;

        const dialog = editPostModalRef.current;

        // Open or close the dialog based on isShown prop
        if (isShown) {
            dialog.showModal();
        } else {
            dialog.close();
        }

        // Close event listener to sync state
        const handleDialogClose = () => onClose();
        dialog.addEventListener("close", handleDialogClose);

        // Cleanup event listener on unmount
        return () => dialog.removeEventListener("close", handleDialogClose);
    }, [isShown, onClose]);

    return (
        <dialog ref={editPostModalRef} className={styles["edit-post-dialog"]}>
            <form method="dialog" className={styles["edit-post-form"]}>
                <input
                    type="text"
                    placeholder="Naslov"
                    className={styles["edit-title-input"]}
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br /> <br />
                <textarea
                    placeholder="Opis..."
                    className={styles["edit-description-textarea"]}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>{" "}
                <br /> <br />
                <button type="submit" className={styles["edit-submit-btn"]}>
                    Uredi objavu
                </button>
            </form>
        </dialog>
    );
}

function PostBtns({ post }: { post: PostType }) {
    const [showEditModal, setEditModalVisiblity] = useState(false);
    const router = useRouter();

    async function deleteThisPost() {
        const postDeletion = await deletePost(post.id);

        if (!postDeletion.success) {
            alert(
                postDeletion.parsed.message ||
                    "Greška prilikom brisanje objave.",
            );
        }
        router.refresh();
    }

    function editThisPost() {
        setEditModalVisiblity((currentState) => !currentState);
    }

    return (
        <>
            <div className={styles["post-btns-container"]}>
                <button
                    onClick={deleteThisPost}
                    className={styles["delete-post-btn"]}
                >
                    <Image
                        src={deleteIcon}
                        alt="delete"
                        width={24}
                        height={24}
                    />
                </button>
                <button
                    onClick={editThisPost}
                    className={styles["edit-post-btn"]}
                >
                    <Image src={editIcon} alt="edit" width={24} height={24} />
                </button>
            </div>
            <EditPostModal
                post={post}
                isShown={showEditModal}
                onClose={() => setEditModalVisiblity(false)}
            />
        </>
    );
}

function Post({ post }: { post: PostType }) {
    return (
        <div className={styles["post"]}>
            <div className={styles["post-title-container"]}>
                <h2 className={styles["post-title"]}>{post.title}</h2>
            </div>
            <div className={styles["post-description-container"]}>
                <div
                    className={styles["post-description"]}
                    dangerouslySetInnerHTML={{ __html: post.description }}
                />
            </div>
            <div className={styles["post-author-container"]}>
                <p className={styles["post-author"]}>
                    Objavio {post.author.username}
                </p>
            </div>
            <PostBtns post={post} />
        </div>
    );
}

export default function PostsList({ posts }: Props) {
    return (
        <div className={styles["posts"]}>
            {posts.map((post) => {
                return <Post key={post.id} post={post} />;
            })}
        </div>
    );
}
