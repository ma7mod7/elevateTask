import Header from "@/components/Header"
import backgroundImage from '../assets/mountain.jpg'
import { Input } from "@/components/ui/input"
import { Info, NotebookPen } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { PostSchema, type PostSchemaType } from "@/schema/PostSchema";
import { useGetUsers } from "@/api/apiMethods";
import API from "@/api/axiosInstance";
import { useState, useEffect } from "react";

const CreatePost = () => {

    const { users } = useGetUsers()
    const [successMessage, setSuccessMessage] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
        reset,
    } = useForm<PostSchemaType>({
        resolver: zodResolver(PostSchema)
    })

    const onsubmit: SubmitHandler<PostSchemaType> = async (data) => {
        try {
            const response = await API.post('/posts', data);
            if (response.status === 201) {
                console.log("Post Created Successfully:", response.data);
                reset();
                setSuccessMessage("✅ Post added successfully");
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    useEffect(() => {
        if (!successMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage]);

    return (
        <div
            className="h-screen flex flex-col items-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <Header />

            <div className="mt-4 w-[1200px] rounded-2xl bg-white/30 backdrop-blur-md">

                {/* start header of create post */}
                <div className="flex items-center justify-between py-4 px-4 bg-white rounded-t-2xl">
                    <div className="flex gap-2 font-semibold text-2xl">
                        <NotebookPen />
                        <p>Create a New Post</p>
                    </div>
                </div>
                {/* end header of create post */}

                {/* start make post */}
                <div className="h-[689px] p-6">

                    {/* success message */}
                    {successMessage && (
                        <div className="mb-4 w-fit px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium">
                            {successMessage}
                        </div>
                    )}

                    <form
                        className="w-[850px] h-[650px] rounded-xl bg-white relative"
                        onSubmit={handleSubmit(onsubmit)}
                    >
                        <div className="p-4 flex flex-col gap-1 font-semibold">
                            <h4>Title</h4>
                            <Input
                                type='text'
                                {...register('title')}
                                placeholder='Enter post title'
                                className="bg-gray-300 w-[600px] border-none outline-none"
                            />
                            {errors.title && (
                                <div className="text-red-500 text-[12px] flex items-center gap-1">
                                    <Info className="w-4 h-4" /> {errors.title.message}
                                </div>
                            )}
                        </div>

                        <div className="p-4 flex flex-col gap-1 font-semibold">
                            <h4>Body</h4>
                            <Textarea
                                placeholder='Enter post body'
                                {...register('body')}
                                className="bg-gray-300 w-[600px] border-none outline-none h-32"
                            />
                            {errors.body && (
                                <div className="text-red-500 text-[12px] flex items-center gap-1">
                                    <Info className="w-4 h-4" /> {errors.body.message}
                                </div>
                            )}
                        </div>

                        <div className="p-4 flex flex-col gap-1 font-semibold">
                            <h4>Author</h4>
                            <Controller
                                name='author'
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-[600px] bg-gray-300">
                                            <SelectValue placeholder="Author" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.length > 0 ? (
                                                users.map((user) => (
                                                    <SelectItem key={user.id} value={user.name}>
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
                                )}
                            />
                            {errors.author && (
                                <div className="text-red-500 text-[12px] flex items-center gap-1">
                                    <Info className="w-4 h-4" /> {errors.author.message}
                                </div>
                            )}
                        </div>

                        <Button
                            disabled={isSubmitting}
                            variant="outline"
                            className="absolute w-[250px] right-[232px] bg-gray-700 text-white hover:bg-gray-600 hover:text-white"
                        >
                            {isSubmitting ? "Creating..." : "Create Post"}
                        </Button>
                    </form>
                </div>
                {/* end make post */}
            </div>
        </div>
    )
}

export default CreatePost
