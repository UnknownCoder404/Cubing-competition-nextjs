import { Posts, Post as PostType } from "../Types/posts";
import postsStyles from "./Posts.module.css";
type Props = {
  posts: Posts;
};

function Post({ post }: { post: PostType }) {
  // TODO: Make description render as html
  return (
    <div className={postsStyles["post"]}>
      <div className={postsStyles["post-title-container"]}>
        <h2 className={postsStyles["post-title"]}>{post.title}</h2>
      </div>
      <div className={postsStyles["post-description-container"]}>
        {post.description}
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
        return <Post post={post} />;
      })}
    </div>
  );
}
