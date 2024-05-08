// Assuming your Post model file is located at "~/server/models/Post.js"
import PostModel from "../../models/Post";

export default defineEventHandler(async (event) => {

    try{
        const body= await readMultipartFormData(event)
        console.log("FormData",body)

        await useStorage().setItemRaw(`fs:${body[2].filename}`, body[2].data);

        // // Create a new instance of the PostModel with the data
        const post = {
            'title':body[0].data,
            'body':body[1].data,
            'image':body[2].filename
        }
        
        const postData = new PostModel(post)
        
        // // Save the post to the database
        await postData.save();
        //Return success message and the saved data
        return {
            "message": "success",
            "data": post
        }; 
    } catch (error) {
        console.log("Error",error);
    }
});
