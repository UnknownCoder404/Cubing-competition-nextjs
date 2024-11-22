"use client";
import { useRef, useState } from "react";
import TitleInput from "../components/Posts/TitleInput";
import postsStyles from "./Posts.module.css";
import DescriptionArea from "../components/Posts/DescriptionArea";
import StyleTextContainer from "../components/Posts/StyleTextContainer";
import { Posts } from "@/app/Types/posts";
import PostsList from "./Posts";
import Preview from "../components/Posts/Preview";
import UploadPostButton from "../components/Posts/UploadPostButton";

export default function PostsPage({ posts }: { posts: Posts }) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const titleInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLTextAreaElement>(null);

    return (
        <main className={postsStyles["form"]}>
            <div>
                <TitleInput
                    ref={titleInput}
                    setValue={setTitle}
                    value={title}
                />
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
                description={description}
                setDescription={setDescription}
            />
            <Preview description={description} title={title} />
            <UploadPostButton
                title={title}
                description={description}
                setDescription={setDescription}
                setTitle={setTitle}
            />
            <PostsList posts={posts} />
        </main>
    );
}
