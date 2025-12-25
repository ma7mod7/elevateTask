import API from "./axiosInstance";
import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
}

interface Post {
    id: number;
    userId:number,
    title: string;
    body:string,
}


export const useGetUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        API.get('/users')
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("error when get users", err);
                setError("Failed to fetch users");
                setLoading(false);
            });
    }, []);

    return { users, loading, error };
}


export const useGetPosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        API.get('/posts')
            .then((res) => {
                setPosts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("error when get posts", err);
                setError("Failed to fetch posts");
                setLoading(false);
            });
    }, []);

    return { posts, loading, error,setPosts };
}



export const useGetPostsDetails = (id:string|undefined) => {
    const [postDetails, setPostDetails] = useState<Post>();
    useEffect(() => {
    API.get(`/posts/${id}`)
            .then(res => setPostDetails(res.data))
            .catch(err => console.log(err));
    }, [id]);

    return { postDetails };
}

