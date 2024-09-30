import postsStyles from "./Posts.module.css";

export default function PostsPage({ posts }: { posts: any[] }) {
  return (
    <div className={`${postsStyles["form"]} ${postsStyles["infoinputs"]}`}>
      <div>
        <input
          type="text"
          className={`${postsStyles["title"]} ${postsStyles["infoinputs"]}`}
          placeholder="Naslov"
        />
      </div>
      <div>
        <textarea
          name="description"
          className={`${postsStyles["description"]} ${postsStyles["infoinputs"]}`}
          placeholder="Opis..."
        ></textarea>
      </div>
    </div>
  );
}
