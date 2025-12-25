import Header from "@/components/Header"
import backgroundImage from '../assets/mountain.jpg'
import { ChevronLeft, ChevronRight, Plus, ScrollText, Search } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetPosts, useGetUsers } from "@/api/apiMethods";
import { useEffect, useState } from "react";
import API from "@/api/axiosInstance";

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAuthor, setSelectedAuthor] = useState("all");

    //  pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 7;

    const { users } = useGetUsers()
    const { posts, setPosts } = useGetPosts()

    const navigate = useNavigate()

    const handlePostDetailsNavigation = (id: number) => {
        navigate(`/post-details/${id}`)
    }

    const handleCreatePostNavigation = () => {
        navigate('/create-post')
    }

    useEffect(() => {
        const endpoint =
            selectedAuthor === "all"
                ? "/posts"
                : `/posts?userId=${selectedAuthor}`;

        API.get(endpoint)
            .then((res) => {
                setPosts(res.data);
                setCurrentPage(1); // reset page on filter change
            })
            .catch((error) => {
                console.error("Error fetching filtered posts:", error);
            });
    }, [selectedAuthor]);

    //  pagination calculations
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = posts.slice(startIndex, endIndex);

    return (
        <div
            className="bg-slate-200 h-screen flex flex-col items-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <Header />

            <div className="mt-4 w-[1200px] rounded-2xl border-b bg-white/10 backdrop-blur-md">

                {/* start header of the post list */}
                <div className="flex items-center justify-between py-4 px-4 bg-white rounded-t-2xl">
                    <div className="flex gap-2 font-semibold text-2xl">
                        <ScrollText />
                        <p>Post List</p>
                    </div>
                    <button className="flex gap-2" onClick={handleCreatePostNavigation}>
                        <Plus />
                        <p>Create a new post</p>
                    </button>
                </div>
                {/* end header of the post list */}

                {/* start search of posts */}
                <div className="py-4 px-4 bg-white/50 backdrop-blur-md flex justify-between">
                    <div className="flex gap-1 items-center w-[909px] h-[51px] bg-white p-4 rounded-full">
                        <Search />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            type="text"
                            placeholder="Search for a post"
                            className="outline-none flex-1"
                        />
                    </div>

                    <div className="flex gap-1 items-center">
                        <p>Author:</p>
                        <Select onValueChange={(value) => setSelectedAuthor(value)}>
                            <SelectTrigger className="w-[153px] h-[51px] bg-white border border-gray-300 rounded-xl outline-none focus:bg-none">
                                <SelectValue placeholder="All" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <SelectItem key={user.id} value={user.id.toString()}>
                                            {user.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="none" disabled>
                                        No users found
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {/* end search of posts */}

                {/* start post list */}
                <div className="bg-white/40">
                    {currentPosts.length > 0 ? (
                        currentPosts.map((post) => (
                            <div
                                key={post.id}
                                className="py-4 px-4 border-b border-gray-400 hover:bg-white/60 hover:cursor-pointer"
                                onClick={() => handlePostDetailsNavigation(post.id)}
                            >
                                <p className="font-medium">{post.body}</p>
                            </div>
                        ))
                    ) : (
                        <div className="py-4 px-4 border-b border-gray-400">
                            <p>There aren't any post</p>
                        </div>
                    )}
                </div>
                {/* end post list */}

                {/* start pagination */}
                <div className="bg-white rounded-b-2xl px-[10px] py-6 m-auto text-center flex justify-center gap-2">
                    <button
                        className="hover:bg-slate-400 px-2  rounded-full"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        <ChevronLeft />

                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={currentPage === index + 1 ? "font-bold bg-blue-400 px-2 rounded-full text-white" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className="hover:bg-slate-400 px-2  rounded-full"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        <ChevronRight />
                    </button>
                </div>
                {/* end pagination */}

            </div>
        </div>
    )
}

export default HomePage
