import Header from "@/components/Header"
import backgroundImage from '../assets/mountain.jpg'
import { useNavigate, useParams } from "react-router-dom"
import { Calendar, MoveLeft, User, } from 'lucide-react';
import API from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import { useGetPostsDetails } from "@/api/apiMethods";

interface User {
    id: number;
    name: string;
}


const PostDetails = () => {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate()
    const { id } = useParams();
    const { postDetails } = useGetPostsDetails(id)
    
    const handleNavigation = () => {
        navigate('/')
    }
    useEffect(() => {
        API.get(`/users/${id}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [id]);
    return (
        <div className="h-screen flex flex-col items-center  bg-cover bg-no-repeat "
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Header />
            <div className=" mt-4 w-[1200px] rounded-2xl  ">
                {/* start top section */}
                <div className=" flex flex-col justify-end h-[390px] bg-gradient-to-b from-[#00254ac2] to-[#21609ac6] rounded-t-xl p-6">
                    <button className="flex w-fit gap-1 bg-[#FFFFFFBF] p-[10px] rounded-full " onClick={handleNavigation}>
                        <MoveLeft />
                        Back to Posts
                    </button>

                    <div>
                        <h1 className="font-bold text-[36px]">
                            {postDetails?.title}
                        </h1>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <p> {user?.name}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <p>Sun, August 24th, 2025</p>
                        </div>
                    </div>
                </div>
                {/* end top section */}

                {/* start bottom section */}
                <div className=" flex flex-col justify-end bg-white/70 backdrop-blur-md">


                    <div>
                        <p className="p-6 h-[350px]">
                            {postDetails?.body}
                        </p>
                    </div>


                </div>
                {/* end bottom section */}

            </div>
        </div>
    )
}

export default PostDetails