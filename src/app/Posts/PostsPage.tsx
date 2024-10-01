"use client";
import { useRef, useState } from "react";
import TitleInput from "../components/Posts/TitleInput";
import postsStyles from "./Posts.module.css";
import DescriptionArea from "../components/Posts/DescriptionArea";
import StyleTextContainer from "../components/Posts/StyleTextContainer";

export default function PostsPage({ posts }: { posts: any[] }) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={`${postsStyles["form"]} ${postsStyles["infoinputs"]}`}>
      <div>
        <TitleInput ref={titleInput} setValue={setTitle} value={title} />
      </div>
      <div>
        <DescriptionArea
          ref={descriptionInput}
          setValue={setDescription}
          value={description}
        />
      </div>
      <StyleTextContainer
        titleInputRef={titleInput}
        descriptionInputRef={descriptionInput}
      />
    </div>
  );
}
