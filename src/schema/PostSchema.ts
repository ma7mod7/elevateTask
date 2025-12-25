
import {  z } from 'zod';

export const PostSchema=z.object({
    title:z.string().min(2,{message:"Post title is required"}),
    body:z.string().min(10 ,{message:"Post body is required "}),
    author:z.string().min(1 ,{message:"Please Select an author for this post "}),

})

export type PostSchemaType=z.infer<typeof PostSchema>