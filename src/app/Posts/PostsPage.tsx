"use client";
import { useState } from "react";
import TitleInput from "../components/Posts/TitleInput";
import postsStyles from "./Posts.module.css";
import DescriptionArea from "../components/Posts/DescriptionArea";
import StyleTextContainer from "../components/Posts/StyleTextContainer";

export default function PostsPage({ posts }: { posts: any[] }) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <div className={`${postsStyles["form"]} ${postsStyles["infoinputs"]}`}>
      <div>
        <TitleInput setValue={setTitle} value={title} />
      </div>
      <div>
        <DescriptionArea setValue={setDescription} />
      </div>
      <StyleTextContainer />
    </div>
  );
}
