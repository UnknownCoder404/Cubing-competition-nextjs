export default async function getPosts() {
  const response = await fetch("https://cubing-competition.onrender.com/posts");
  const posts = await response.json();
  return posts;
}
