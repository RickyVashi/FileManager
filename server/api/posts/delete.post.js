

  // Assuming your Post model file is located at "~/server/models/Post.js"
import PostModel from "../../models/Post";

export default defineEventHandler(async (event) => {

    try{
        const data= await readBody(event)

        const getData = await PostModel.findByIdAndDelete(data);
       
        return {
            "message": "Deleted Successfully",
            "data": getData
        }; 
       
    } catch (error) {
        console.log("Error",error);
    }
});