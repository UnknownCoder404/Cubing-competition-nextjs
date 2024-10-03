import { Posts, Post as PostType } from "../Types/posts";
import postsStyles from "./Posts.module.css";
type Props = {
  posts: Posts;
};

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
      <div className={postsStyles["post-btns-container"]}></div>
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
