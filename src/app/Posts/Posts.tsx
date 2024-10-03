import Image from "next/image";
import { Posts, Post as PostType } from "../Types/posts";
import postsStyles from "./Posts.module.css";
import deleteIcon from "@/app/public/delete.svg";
import editIcon from "@/app/public/edit.svg";
type Props = {
  posts: Posts;
};

function PostBtns({ post }: { post: PostType }) {
  async function deleteThisPost() {}
  async function editThisPost() {}
  return (
    <div className={postsStyles["post-btns-container"]}>
      <button
        onClick={deleteThisPost}
        className={postsStyles["delete-post-btn"]}
      >
        <Image src={deleteIcon} alt="delete" width={24} height={24} />
      </button>
      <button onClick={editThisPost} className={postsStyles["edit-post-btn"]}>
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
