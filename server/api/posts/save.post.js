// Assuming your Post model file is located at "~/server/models/Post.js"
import PostModel from "../../models/Post";

export default defineEventHandler(async (event) => {

    try{
        const body= await readBody(event)


        // Create a new instance of the PostModel with the data
        const post = new PostModel(body);

        // Save the post to the database
        await post.save();

        // Return success message and the saved data
        return {
            "message": "success",
            "data": post
        }; 
    } catch (error) {
        console.log("Error",error);
    }
});
