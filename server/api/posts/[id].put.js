

  // Assuming your Post model file is located at "~/server/models/Post.js"
import PostModel from "../../models/Post";

export default defineEventHandler(async (event) => {

    try{
        const {_id,title,body}= await readBody(event)

        const existingPost = await PostModel.findOne({ _id : _id });

        existingPost.title = title;
        existingPost.body = body;
        await existingPost.save();

        return {
            "message": "Updated Successfully",
            "data": existingPost
        }; 
       
    } catch (error) {
        console.log("Error",error);
    }
});