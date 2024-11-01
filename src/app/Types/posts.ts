export type Post = {
    createdAt: string;
    editedAt: string;
    id: string;
    title: string;
    description: string;
    author: {
        id: string;
        username: string;
    };
};
export type Posts = Post[];
