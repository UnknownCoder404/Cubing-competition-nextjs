import Image from "next/image";
import { Posts, Post as PostType } from "../Types/posts";
import postsStyles from "./Posts.module.css";
import deleteIcon from "@/app/public/delete.svg";
import editIcon from "@/app/public/edit.svg";
import { deletePost } from "../utils/posts";
import { useRouter } from "next/navigation";
type Props = {
    posts: Posts;
};

function PostBtns({ post }: { post: PostType }) {
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
    async function editThisPost() {}
    return (
        <div className={postsStyles["post-btns-container"]}>
            <button
                onClick={deleteThisPost}
                className={postsStyles["delete-post-btn"]}
            >
                <Image src={deleteIcon} alt="delete" width={24} height={24} />
            </button>
            <button
                onClick={editThisPost}
                className={postsStyles["edit-post-btn"]}
            >
                <Image src={editIcon} alt="edit" width={24} height={24} />
            </button>
        </div>
    );
}

function Post({ post }: { post: PostType }) {
    return (
        <div className={postsStyles["post"]}>
            <div className={postsStyles["post-title-container"]}>
                <h2 className={postsStyles["post-title"]}>{post.title}</h2>
            </div>
            <div className={postsStyles["post-description-container"]}>
                <div
                    className={postsStyles["post-description"]}
                    dangerouslySetInnerHTML={{ __html: post.description }}
                />
            </div>
            <div className={postsStyles["post-author-container"]}>
                <p className={postsStyles["post-author"]}>
                    Objavio {post.author.username}
                </p>
            </div>
            <PostBtns post={post} />
        </div>
    );
}

export default function PostsList({ posts }: Props) {
    return (
        <div className={postsStyles["posts"]}>
            {posts.map((post) => {
                return <Post key={post.id} post={post} />;
            })}
        </div>
    );
}
